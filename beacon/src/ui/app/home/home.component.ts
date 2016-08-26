import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vcf-import',
  template: `
    <h2>{{title}}</h2>
    <div class="demo-list-action mdl-list" style="width:400px">
      Home page and dashboard to display notifications and metrics.
      <ul>
        <li>Queries over time</li>
        <li>Number of samples</li>
        <li>Number of individuals</li>
        <li>Audit History</li>
        <li>Storage Metrics</li>
      </ul>
    </div>
    `
})

export class HomeComponent {
  title = 'Dashboard';

}
