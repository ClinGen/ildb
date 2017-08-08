import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from './case.services';

import * as _ from "lodash";

@Component({
  templateUrl: 'case-edit.component.html',
  providers: [CaseService]
})

export class CaseDetailsComponent implements OnInit {

  isNew = false;
  id = "";
  icdVersion = "10";

  // New/Empty case record
  model = {
    id: "",
    caseId: "", //required string - autogenerate if not supplied
    city: "", //required string
    state: "", //required string
    zip: "", //require string
    gender: null, // m/f required
    country: "",
    sampleCollectionDate: null,
    clinicalIndications: null,
    diseasePanel: [],
    hasHistoryOfCancer: false,
    ethnicity: [],
    personalHistory: [],
    familyHistory: []
  }

  personalHistory = {}

  familyHistory = {}

  plugins = [];

  samples = [];

  selectedEthnicities = {};

  getEthnicityKeys() {
    return Object.keys(this.ethnicityOptions);
  }

  ethnicityOptions = {
    "ne": "Northern European",
    "se": "Southern European",
    "fc": "French Canadian or Cajun",
    "af": "African",
    "afa": "African American",
    "hi": "Hispanic",
    "me": "Middle Eastern",
    "na": "Native American",
    "pi": "Pacific Islander",
    "aj": "Ashkenazim Jewish",
    "ea": "East Asian",
    "sa": "South Asian",
    "mi": "Mixed",
    "ot": "Other/Unknown"
  }
  
  constructor(route: ActivatedRoute, public dataService: CaseService, private router: Router) {
    this.model.id = route.snapshot.params['id'];

    _.chunk(['a', 'b', 'c', 'd'], 2);

    if (this.model.id === "new")
      this.isNew = true;
    else
      this.isNew = false;
  }

  ngOnInit() {

    //this.loadViews();
    
    //Load case samples
    if (this.isNew)
      return;

    //load list of samples
    this.loadSampleList();
  }

  loadViews() {
    this.dataService.getViewBundle()
      .then((results) => {
        this.plugins = results.sort((a, b) => {
          return a.schema.info.sort - b.schema.info.sort
        });
      })
      .catch(error => console.log(error));
  }

  // VCF sample list
  loadSampleList() {

    this.dataService.getCaseSamples(this.model.id)
      .then(results => this.samples = results)
      .catch(error => console.log(error));

    this.dataService.getById(this.model.id)
      .then(result => {
        if (result.clinicalIndications != null)
          result.clinicalIndications = result.clinicalIndications.join()
        
        if (result.ethnicity) {
          for(var i = 0; i < result.ethnicity.length; i++) {
            this.selectedEthnicities[result.ethnicity[i]] = true;
          }
        }

        this.model = result;
      })
      .catch(error => console.log(error))
  }

  showImportDialog = false;
  showAddFamilyHistoryDialog = false;
  showAddPersonalHistoryDialog = false;

  selectedImportFile = {
    "file": ''
  };
  importFileName = "";
  @Input() importProgress = 0;
  isUploading = false;

  fileList = []

  fileChangeEvent(fileInput: any) {
    this.selectedImportFile.file = fileInput.target.files;
  }

  getList() {

  }

  save() {
    // if this is a new case - save and route to edit/view case
    
    let doc = JSON.parse(JSON.stringify(this.model))
    if (doc.clinicalIndications != null)
      doc.clinicalIndications = doc.clinicalIndications.split(',');

    let keys = Object.keys(this.selectedEthnicities);
    doc.ethnicity = [];
    for (var i = 0; i < keys.length; i++) {
      let ethnicity = this.selectedEthnicities[keys[i]];
      if (ethnicity) {
        doc.ethnicity.push(keys[i])
      }
    }

    if (this.isNew) {
      this.dataService.addCase(doc)
        .then(result => {
          this.isNew = false;
          this.id = result.id;
          this.model.id = result.id;
          this.router.navigate(['/case', result.id])
        })
        .catch(error => console.log(error))
    }
    else {
      this.dataService.updateCase(doc.id, doc)
      // Do we want to notify user and/or return to list?
    }
  }

  addPersonalHistoryItem() {
    this.model.personalHistory.push(this.personalHistory);
    this.personalHistory = {};
    document.getElementById("addPersonalCancel").click();
  }

  deletePersonalHistoryItem(index) {
    this.model.personalHistory.splice(index, 1);
  }

  addFamilyHistoryItem() {
    this.model.familyHistory.push(this.familyHistory);
    this.familyHistory = {};
    document.getElementById("addFamilyCancel").click();
  }

  deletFamilyHistoryItem(index) {
    this.model.familyHistory.splice(index, 1);
  }

  // import a VCF file and associate the samples with the case
  import() {

    this.isUploading = true;

    this.upload(this.selectedImportFile.file[0])
      .then(result => { this.isUploading = false; document.getElementById("modalCancel").click(); this.loadSampleList(); })
      .catch(error => { console.log(error); this.isUploading = false })
  }

  cancelImport() {
    this.importFileName = "";
  }

  // Upload a vcf file
  upload(file) {
    return new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      // update file upload progress
      xhr.upload.onprogress = (event: any) => {
        let importProgress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);

        // This is a workaround to some problems with the progress bar updating
        // If we can get this working update the UI tag with teh following
        //      [style.width.%]="importProgress"
        // For some reason the view keeps seeing the original value set on the class
        document.getElementById("progressBar").style.width = importProgress + "%";
      };

      xhr.open('POST', `/api/case/${this.model.id}/sample`, true);

      let formData = new FormData();

      formData.append("file", file, this.importFileName);

      xhr.send(formData);
    });
  }
}