import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  template: `
    <h2>Patient Details</h2>
    {{patientId}}
    <div>
    <h4>genome samples</h4>
      <div *ngFor="let item of samples" class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          <i class="material-icons">label</i>
          <span>{{item.id}}</span>
        </span>
      </div>
    </div>
    <div>
    <strong>import vcf</strong>
    </div>
    <div>
        <input type="file" accept="vcf" (change)="fileChangeEvent($event)" placeholder="Upload file..." />                         
    </div>
    <div>
    <button [disabled]="uploading" (click)="import()">import</button>
    <span [hidden]="!uploading" >uploading...</span>
    </div>
    `,
    providers:[DataService]
})

export class PatientDetailsComponent implements OnInit {
  patientId = "";
  samples=[];
  constructor(route: ActivatedRoute, private dataService : DataService) {
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
      .then(result => {this.uploading = false; this.loadSampleList();})
      .catch(error => {console.log(error); this.uploading = false})
  }
}