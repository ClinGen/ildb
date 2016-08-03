import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'vcf-import',
  template: `
    <h2>Batch Import</h2>
    <form class="form-horizontal" role="form" >
        <div class="form-group">
            <label class="control-label col-sm-4" for="myimage">VCF File</label>
            <div class="col-sm-7">
                <div>
                    <input type="file" accept="vcf" (change)="fileChangeEvent($event)" placeholder="Upload file..." />                         
                </div>   
            </div>
        </div>
        <div class="form-group">        
        <div class="text-center">
            <button type="button" (click)="upload()">Upload</button>             
        </div>
        </div>
  </form>
    `
})

export class ImportComponent {
  constructor(private http: Http) { }
  myfile = {
    "file": ''
  }

  fileChangeEvent(fileInput: any) {
    this.myfile.file = fileInput.target.files;
  }

  //TODO: move this to a service and wrap it in a promise
  upload() {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //console.debug('success')
        } else {
          alert(xhr.response);
        }
      }
    };

    xhr.open('POST', '/api/import/vcf', true);

    let formData = new FormData();
    formData.append("file", this.myfile.file[0], 'vcfimport');
    xhr.send(formData);
  }
}
