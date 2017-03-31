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

import { RouterModule }  from '@angular/router';
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

        @Input() test = "something";

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

}

export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {

    const decoratedCmp = Component(metadata)(CasePanelComponent);

    @NgModule({ imports: [CommonModule, RouterModule, FormsModule], declarations: [decoratedCmp], entryComponents: [decoratedCmp] })
    class DynamicHtmlModule { }

    return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
       .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
        return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
      });
}

@Directive({ selector: 'html-outlet' })
export class HtmlOutlet  implements OnChanges {
  @Input() html: string;
  cmpRef: ComponentRef<any>;
  model: {};

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

  ngOnChanges() {
    const html = this.html;
    if (!html) return;
    
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }

    //console.log(atob(this.html));
    
    const compMetadata = new Component({
        selector: 'dynamic-html',
        template: atob(this.html),
    });

    createComponentFactory(this.compiler, compMetadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);   
        this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
        (<CasePanelComponent>this.cmpRef.instance).test = "hello";
        console.log(this.cmpRef);
      });
  }
  
  ngOnDestroy() {
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }    
  }
}