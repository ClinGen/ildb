import { Component } from '@angular/core';

@Component({
  selector: 'vcf-import',
  templateUrl: '/app/import/import.component.html'
})
export class ImportComponent {

  showImportDialog = false;
  selectedImportFile = {
    "file": ''
  };
  importFileName = "";
  importProgress = 10;
  isUploading = false;

  fileList = [{
    id:"asf"
  }]
  
  fileChangeEvent(fileInput: any) {
    this.selectedImportFile.file = fileInput.target.files;
  }

  delete(id:string) {

  }

  import() {

    this.isUploading = true;

    this.upload(this.selectedImportFile.file[0])
      .then(result => { this.isUploading = false; document.getElementById("modalCancel").click(); })
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
      xhr.upload.onprogress = (event:any) => {
        this.importProgress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
      };

      xhr.open('POST', '/api/import/vcf', true);

      let formData = new FormData();

      formData.append("file", file, this.importFileName);

      xhr.send(formData);
    });
  }
}
