import { Component, Input, OnInit } from '@angular/core';
import { ImportService } from './import.service';

@Component({
  selector: 'vcf-import',
  templateUrl: '/app/import/import.component.html',
  providers:[ImportService]
})
export class ImportComponent implements OnInit {

  constructor (
    private dataService: ImportService) {
  }

  showImportDialog = false;
  selectedImportFile = {
    "file": ''
  };
  importFileName = "";
  @Input() importProgress = 0;
  isUploading = false;

  fileList = []

  ngOnInit() {
    this.getFileList();
  }

  getFileList() {
    this.dataService.getFileList()
      .then(fileList => this.fileList = fileList)
      .catch(error => console.log(error))
  }

  fileChangeEvent(fileInput: any) {
    this.selectedImportFile.file = fileInput.target.files;
  }

  getList() {
    
  }

  delete(id: string) {

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
      xhr.upload.onprogress = (event: any) => {
        let importProgress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);

        // This is a workaround to some problems with the progress bar updating
        // If we can get this working update the UI tag with teh following
        //      [style.width.%]="importProgress"
        // For some reason the view keeps seeing the original value set on the class
        document.getElementById("progressBar").style.width = importProgress + "%";
      };

      xhr.open('POST', '/api/import/vcf', true);

      let formData = new FormData();

      formData.append("file", file, this.importFileName);

      xhr.send(formData);
    });
  }
}
