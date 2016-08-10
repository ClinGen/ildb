import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'vcf-import',
  template: `
    <h2>{{title}}</h2>
    <div class="demo-list-action mdl-list" style="width:400px">
      Home page and dashboard to display notifications and metrics
    </div>
    `,
    providers:[DataService]
})

export class HomeComponent {
  title = 'Dashboard';

}
