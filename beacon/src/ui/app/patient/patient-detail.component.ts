import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PatientService } from './patient.services';

@Component({
  templateUrl: '/app/patient/patient-edit.component.html',
  providers: [PatientService]
})

export class PatientDetailsComponent implements OnInit {
  patientId = "";
  showGenePanel = true;

  samples = [];
  constructor(route: ActivatedRoute, private dataService: PatientService) {
    this.patientId = route.snapshot.params['id'];
  }

  ngOnInit() {
    //Load patient samples
    this.loadSampleList();
  }

  loadSampleList() {
    this.dataService.getPatientSamples(this.patientId)
      .then(results => this.samples = results)
      .catch(error => console.log(error))
  }

  uploading = false;
  myfile = {
    "file": ''
  }

  fileChangeEvent(fileInput: any) {
    this.myfile.file = fileInput.target.files;
  }

  import() {
    if (this.myfile.file == '')
      return;

    this.uploading = true;
    this.dataService.uploadPatientSample(this.patientId, this.myfile.file[0])
      .then(result => { this.uploading = false; this.loadSampleList(); })
      .catch(error => { console.log(error); this.uploading = false })
  }
}