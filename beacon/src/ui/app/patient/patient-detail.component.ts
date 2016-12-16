import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PatientService } from './patient.services';

@Component({
  templateUrl: '/app/patient/patient-edit.component.html',
  providers: [PatientService]
})

export class PatientDetailsComponent implements OnInit {

  isNew = false;
  id = "";

  // New/Emptye case record
  model = {
    id:"",
    caseId : "", //required string - autogenerate if not supplied
    city : "", //required string
    state : "", //required string
    zip : "", //require string
    gender : null, // m/f required
    sampleCollectionDate : null,
    clinicalIndications : null,
    diseasePanel : [],
    hasHistoryOfCancer : false,
    ethnicity : [],
    personalHistory : [],
    familyHistory : []
  }

  ethnicityOptions = {
    "ne":"Northern European",
    "se":"Southern European",
    "fc":"French Canadian or Cajun"
  }

  personalHistory = [
    {
      cancerType : "colon",
      ageAtDiagnosis: 55,
      pathology :{
        "type":"er",
        "result":"MSH2"
      }
    }
  ]

  familyHistory = [
    {
      cancerType : "colon",
      ageAtDiagnosis: 77,
      relation: "father",
      side: "paternal",
      pathology :{
        "type":"er",
        "result":"MSH2"
      }
    }
  ]

  samples = [];
  constructor(route: ActivatedRoute, private dataService: PatientService, private router: Router) {
    this.model.id = route.snapshot.params['id'];

     if (this.model.id === "new")
      this.isNew = true;
  }

  ngOnInit() {
    //Retrieve individual information

    //Load patient samples
    if (this.isNew)
      return;

    //load list of samples
    this.loadSampleList();
  }

  // VCF sample list
  loadSampleList() {
    this.dataService.getPatientSamples(this.model.id)
      .then(results => this.samples = results)
      .catch(error => console.log(error))

    this.dataService.getById(this.model.id)
      .then(result => this.model = result)
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
    // if this is a new patient - save and route to edit/view patient
    if (this.isNew)
    {
    this.dataService.addPatient(this.model)
      .then(result => this.router.navigate(['/patient', result.id]))
      .catch(error => console.log(error))
    }
    else{
      this.dataService.updatePatient(this.model.id, this.model)
      // Do we want to notify user and/or return to list?
    }
  }

  addPersonalHistoryItem() {
    this.showAddPersonalHistoryDialog = true;
  }

  addFamilyHistoryItem() {
    this.showAddFamilyHistoryDialog = true;
  }

  saveFamilyHistoryItem() {
    this.showAddFamilyHistoryDialog = false;
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

      xhr.open('POST', `/api/patient/${this.model.id}/sample`, true);

      let formData = new FormData();

      formData.append("file", file, this.importFileName);

      xhr.send(formData);
    });
  }
}