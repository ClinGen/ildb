import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  templateUrl: "./settings.component.html",
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

  fileChangeEvent(event) {
    event.target.value = '';
  }

  logoFileChange(event) {
    this.imageUploadFile = event.target.files[0];
  }

  uploadLogo() {
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

        //document.getElementById("progressBar").style.width = importProgress + "%";
      };

      alert(this.imageUploadFile);

      xhr.open('POST', '/api/settings/logo', true);

      let formData = new FormData();

      formData.append("file", this.imageUploadFile, this.imageUploadFile.name);

      xhr.send(formData);
    });
  }
}
