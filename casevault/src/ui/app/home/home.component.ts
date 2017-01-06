import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  templateUrl: '/app/home/home.component.html',
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
	}

	totalCases = 0;
	recentQueryCount = 0;
}
