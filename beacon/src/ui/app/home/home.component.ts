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
		<p>Queries Over Times</p>
    		</div>
    		<div class="col-md-2 col-sm-2 box0">
    			<div class="box1">
          <i class="fa fa-database"></i>
		<h3>+48</h3>
    			</div>
		<p>Number of Samples</p>
    		</div>
    		<div class="col-md-2 col-sm-2 box0">
    			<div class="box1">
		              <i class="fa fa-eyedropper"></i>
		<h3>23</h3>
    			</div>
		<p>Number of Individuals</p>
    		</div>
    		<div class="col-md-2 col-sm-2 box0">
    			<div class="box1">
		<i class="fa fa-user"></i>
		<h3>+10</h3>
    			</div>
		<p>Audit History</p>
    		</div>
    		<div class="col-md-2 col-sm-2 box0">
    			<div class="box1">
		<i class="fa fa-history"></i>
		<h3>OK!</h3>
    			</div>
		<p>Storage Metrics</p>
    		</div>
    	</div>
    </div>
    `
})

export class HomeComponent {
  title = 'Dashboard';

}
