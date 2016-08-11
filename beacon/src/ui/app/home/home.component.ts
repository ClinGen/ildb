import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vcf-import',
  template: `
    <h2>{{title}}</h2>
    <div class="demo-list-action mdl-list" style="width:400px">
      Home page and dashboard to display notifications and metrics
    </div>
    `
})

export class HomeComponent {
  title = 'Dashboard';

}
