import { PlatformDetectorService } from './../../../core/platform-detector/platform-detector.service';
import { element } from 'protractor';
import { Directive, OnInit, ElementRef } from '@angular/core';

//Usando [] nós criamos uma diretiva de atributo
@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

    constructor(
        private element: ElementRef<any>,
        private platformDetector: PlatformDetectorService) { }

    //Nós pegamos o elemento que foi resgatado de onde a diretiva se encontra
    //Fazemos um IF para análise se estamos em um navegador, se SIM, executamos o código que faz com oq o elemento dispare o evento CLICK();
    ngOnInit(): void {
        this.platformDetector.isPlatformBrowser &&
            this.element.nativeElement.click();
    }

}