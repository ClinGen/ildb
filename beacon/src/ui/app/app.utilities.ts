import {Directive, AfterViewInit} from '@angular/core';
declare var componentHandler;

@Directive({
    selector: '[mdl]'
})    
export class Mdl implements AfterViewInit {
    ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }
}