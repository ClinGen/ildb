import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  templateUrl: "settings.component.html",
  providers: [SettingsService]
})

export class SettingsComponent implements OnInit {

  constructor (
    private dataService: SettingsService) {
  }

  imageUploadFile = null;

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
}
