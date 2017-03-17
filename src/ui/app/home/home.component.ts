import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.component.html',
  providers:[HomeService]
})

export class HomeComponent implements OnInit {
  title = 'Dashboard';

	constructor (
    private dataService: HomeService) {
  }

	ngOnInit() {
    this.loadData();
  }

	loadData() {
		this.dataService.getQueryStats()
      .then(stats => this.recentQueryCount = stats.lastSevenDays)
      .catch(error => console.log(error))

    this.dataService.getQueryLogs()
      .then(queryLogs => this.queryLogs = queryLogs)
      .catch(error => console.log(error))

		this.dataService.getCaseStats()
      .then(stats => this.caseStats = stats)
      .catch(error => console.log(error))
	}

  queryLogs = [];
  caseStats = {total:0};
	recentQueryCount = 0;
	variantFiles = 0;
}
