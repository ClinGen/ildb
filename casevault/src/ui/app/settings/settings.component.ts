import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  templateUrl: "/app/settings/settings.component.html",
  providers: [SettingsService]
})

export class SettingsComponent implements OnInit {

  constructor (
    private dataService: SettingsService) {
  }

  model = {
    name: "",
    description: "",
    thumbprint: "",
    endpoint: ""
  }

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.dataService.getDetails()
      .then(model => this.model = model)
      .catch(error => console.log(error))
  }

  fileChangeEvent(event) {
    event.target.value = '';
  }

  import() {
    
  }
}
