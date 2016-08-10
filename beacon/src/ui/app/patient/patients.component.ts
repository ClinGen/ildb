import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  template: `
    <h2>Patient List</h2>
    <div class="demo-list-action mdl-list" style="width:400px">
      <div *ngFor="let item of patients" class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-avatar">person</i>
          <a routerLink="/patient/{{item.id}}">
          <span>{{item.id}}</span>
          </a>
        </span>
        <a class="mdl-list__item-secondary-action" (click)="delete(item.id)"><i class="material-icons">delete</i></a>
      </div>
    </div>
    <a href="#" routerLink="/patient/new">add patient</a>
    `,
    providers:[DataService]
})

export class PatientsComponent implements OnInit {
  
  patients = [];

  constructor (
    private dataService: DataService) {
  }

  ngOnInit() {
    this.getPatients();
  }
  
  getPatients() {
    this.dataService.getPatientList()
      .then(patients => this.patients = patients)
      .catch(error => console.log(error))
  }

  delete(id) {
    this.dataService.deletePatient(id)
      .then(data => this.getPatients())
      .catch(error => console.log(error))
  }
}
