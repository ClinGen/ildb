import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseVaultService } from './casevault.services';

// Display casevault id, name, query count (use/issued), users status
@Component({
  templateUrl: '/app/manage/casevault.component.html',
  providers:[CaseVaultService]
})

export class CaseVaultComponent implements OnInit {

  organizations = [];

  selectedImportFile = {
    "file": null
  };

  constructor (
    private router: Router,
    private dataService: CaseVaultService) {
  }

  ngOnInit() {
    this.getCaseVaults();
  }

  importVault() {
    var reader = new FileReader();

    var f = '';

    reader.onload = (function(cvault) {
        return function(e) {
          if (e.target.readyState == 2) {
            var contents = e.target.result;
            var doc = JSON.parse(contents);
            cvault.dataService.add (
              {
                "name":doc["name"],
                "description":doc["description"],
                "endpoint":doc["endpoint"]
              }
            );
            cvault.getCaseVaults();
          }
        };
      })(this);

    reader.readAsText(this.selectedImportFile.file)
  }

  fileChangeEvent(fileInput: any) {
    this.selectedImportFile.file = fileInput.target.files[0];
  }

  getCaseVaults() {
    this.dataService.getList()
      .then(organizations => this.organizations = organizations)
      .catch(error => console.log(error))
  }

  delete(id) {
    this.dataService.delete(id)
      .then(data => this.getCaseVaults())
      .catch(error => console.log(error))
  }
}
