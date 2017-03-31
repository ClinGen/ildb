import {
  Component,
  Directive,
  NgModule,
  Input,
  ViewContainerRef,
  Compiler,
  ComponentFactory,
  ModuleWithComponentFactories,
  ComponentRef,
  ReflectiveInjector,
  OnChanges,
  OnInit
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export class CasePanelComponent implements OnInit {

  constructor() {
    console.log('constructed');
  }

  ngOnInit() {
    console.log('initialized');
  }

  selectedEthnicities = {};

  getEthnicityKeys() {
    return Object.keys(this.ethnicityOptions);
  }

  ethnicityOptions = {
    "ne": "Northern European",
    "se": "Southern European",
    "fc": "French Canadian or Cajun",
    "af": "African",
    "afa": "African American",
    "hi": "Hispanic",
    "me": "Middle Eastern",
    "na": "Native American",
    "pi": "Pacific Islander",
    "aj": "Ashkenazim Jewish",
    "ea": "East Asian",
    "sa": "South Asian",
    "mi": "Mixed",
    "ot": "Other/Unknown"
  }

  // New/Empty case record
  model = {
    id: "",
    caseId: "", //required string - autogenerate if not supplied
    city: "", //required string
    state: "", //required string
    zip: "", //require string
    gender: null, // m/f required
    country: "",
    sampleCollectionDate: null,
    clinicalIndications: null,
    diseasePanel: [],
    hasHistoryOfCancer: false,
    ethnicity: [],
    personalHistory: [],
    familyHistory: []
  }

  personalHistory = {}

  familyHistory = {}

  addPersonalHistoryItem() {
    this.model.personalHistory.push(this.personalHistory);
    this.personalHistory = {};
    document.getElementById("addPersonalCancel").click();
  }

  deletePersonalHistoryItem(index) {
    this.model.personalHistory.splice(index, 1);
  }

  addFamilyHistoryItem() {
    this.model.familyHistory.push(this.familyHistory);
    this.familyHistory = {};
    document.getElementById("addFamilyCancel").click();
  }

  deletFamilyHistoryItem(index) {
    this.model.familyHistory.splice(index, 1);
  }
}

export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {

  const cmpClass = class DynamicComponent extends CasePanelComponent { };

  const decoratedCmp = Component(metadata)(cmpClass);

  @NgModule({ imports: [CommonModule, RouterModule, FormsModule], declarations: [decoratedCmp] })
  class DynamicHtmlModule { }

  return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
    });
}

@Directive({ selector: 'case-plugin' })
export class CasePlugin implements OnChanges {
  @Input() html: string;
  cmpRef: ComponentRef<any>;
  model: {};

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

  ngOnChanges() {
    const html = this.html;
    if (!html) return;

    if (this.cmpRef) {
      this.cmpRef.destroy();
      this.cmpRef = null;
    }

    const compMetadata = new Component({
      selector: 'case-panel',
      template: atob(this.html),
    });

    createComponentFactory(this.compiler, compMetadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
      });
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}