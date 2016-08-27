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

    // We may want to consider one of the bootstrap libraries
    document.getElementById("modalCancel").click();
  }

  cancelImport() {
    this.importFileName = "";
  }
}
