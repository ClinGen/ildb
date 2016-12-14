import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PatientService } from './patient.services';

@Component({
  templateUrl: '/app/patient/patient-edit.component.html',
  providers: [PatientService]
})

export class PatientDetailsComponent implements OnInit {
  patientId = "";
  reference = "";

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
      ageAtDiagnosis: 55,
      relation: "grandfather",
      side: "maternal",
      pathology :{
        "type":"er",
        "result":"MSH2"
      }
    },
    {
      cancerType : "foot",
      ageAtDiagnosis: 77,
      relation: "father",
      side: "paternal",
      pathology :{
        "type":"er",
        "result":"MSH2"
      }
    }
  ]

  showGenePanel = true;

  samples = [];
  constructor(route: ActivatedRoute, private dataService: PatientService) {
    this.patientId = route.snapshot.params['id'];
  }

  ngOnInit() {
    //Retrieve individual information

    //Load patient samples
    this.loadSampleList();
  }

  loadSampleList() {
    this.dataService.getPatientSamples(this.patientId)
      .then(results => this.samples = results)
      .catch(error => console.log(error))

    this.dataService.getById(this.patientId)
      .then(results => this.reference = results.reference)
      .catch(error => console.log(error))
  }

  showImportDialog = false;
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

  delete(id: string) {

  }

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

      xhr.open('POST', `/api/patient/${this.patientId}/sample`, true);

      let formData = new FormData();

      formData.append("file", file, this.importFileName);

      xhr.send(formData);
    });
  }
}