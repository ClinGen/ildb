import { Component, OnInit } from '@angular/core';
import { QueryService } from './query.service';

export class CaseVaultQuery {
  chrom: string;
  position: string;
  allele: string;
  clinicalIndications: string;
  populations: string;
}

@Component({
  selector: 'hub-home',
  templateUrl: '/app/search.component.html',
  providers: [QueryService]
})

export class SearchComponent implements OnInit {

  title = 'Case Vault Search';

  selectedQuery :any = {};

  queries: any[] = [{
    id: 1,
    title: "Seen a variant",
    description: "Has this variant been seen in a case?"
  }, {
    id: 2,
    title: "Variant in-cis with another",
    description: "Whether the [variant] is [in-cis] with another [pathogenic] variant?"
  }, {
    id: 3,
    title: "Phenotype with variant of interest",
    description: "What is the phenotype of all cases that have the variant of interest?"
  }, {
    id: 4,
    title: "Seen a denovo",
    description: "Has this ever been seen as a denovo in any case?"
  }];

  queryResults: any[];

  constructor(
    private queryService: QueryService) {

  }

  selectQuery(id:any) {
    this.selectedQuery = this.queries[id-1];
  }

  ngOnInit() {
    this.selectQuery(1);
  }

  find() {
    this.queryService.queryCaseVaults(this.selectedQuery.id, this.caseVaultQuery.chrom, this.caseVaultQuery.position, this.caseVaultQuery.allele, this.caseVaultQuery.clinicalIndications, this.caseVaultQuery.populations)
      .then(queryResults => this.queryResults = queryResults)
      .catch(error => console.log(error))
  }

  caseVaultQuery: any = {
    chrom: '1',
    position: '4014670',
    allele: "G",
    clinicalIndications: "",
    populations: "",
    acmgLabel: "",
    windowSize: "",
    annotationDb: ""
  };
}
