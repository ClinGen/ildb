import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'vcf-import',
  template: `
    <h2>{{title}}</h2>
    <div class="demo-list-action mdl-list" style="width:400px">
      <div *ngFor="let item of samples" class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-avatar">person</i>
          <span>{{item.id}}</span>
        </span>
        <a class="mdl-list__item-secondary-action" href="#" (click)="onSelect(item)"><i class="material-icons">delete</i></a>
      </div>
    </div>
    `
})

export class AuthComponent implements OnInit {

  samples: any[];

  constructor (
    private dataService: DataService) {
  }

  getSamples() {
    this.dataService.getSamples()
      .then(samples => this.samples = samples)
      .catch(error => console.log(error))
  }

  ngOnInit() {
    this.getSamples();
  }

  title = 'Dashboard';
}
