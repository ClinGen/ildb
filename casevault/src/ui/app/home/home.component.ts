import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vcf-import',
  template: `
  <div class="col-lg-12 main-chart">
    <div class="row mtbox">
    		<div class="col-md-2 col-sm-2 col-md-offset-1 box0">
    			<div class="box1">
	  			<i class="fa fa-user"></i>
	        <h3>933</h3>
        </div>
		<p>Vault Queries (last 7 days)</p>
    		</div>
    		<div class="col-md-2 col-sm-2 box0">
    			<div class="box1">
          <i class="fa fa-database"></i>
		<h3>248</h3>
    			</div>
		<p>Number of Samples</p>
    		</div>
    		<div class="col-md-2 col-sm-2 box0">
    			<div class="box1">
		              <i class="fa fa-eyedropper"></i>
		<h3>247</h3>
    			</div>
		<p>Number of Cases</p>
    		</div>
    		<div class="col-md-2 col-sm-2 box0">
    			<div class="box1">
		<i class="fa fa-user"></i>
		<h3>10</h3>
    			</div>
		<p>Logins (last 7 days)</p>
    		</div>
    		<div class="col-md-2 col-sm-2 box0">
    			<div class="box1">
		<i class="fa fa-history"></i>
		<h3>OK!</h3>
    			</div>
		<p>Data Storage Health</p>
    		</div>
    	</div>
    </div>
    `
})

export class HomeComponent {
  title = 'Dashboard';

}
