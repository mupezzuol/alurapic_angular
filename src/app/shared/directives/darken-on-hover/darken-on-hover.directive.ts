import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

//Usando [] eu posso utiliza-la como atributo em nossas tasg.. Ex: <i apDarkOnHover></i>
@Directive({
    selector: '[apDarkOnHover]'
})
export class DarkenOnHoverDirectvive{

    @Input() brightness = '70%';//Inicializa com 70% caso ninguém atribua nada

    //ElementRef -> Nos dá o Elemento do DOM que a diretiva está
    constructor(
        private el: ElementRef,
        private render: Renderer
    ){}


    //JavaScript há os eventos mouseover e mouseleave
    //HostListener -> Sabe qual é o elemento hospedeiro, portanto ao fazer esse evento na TAG que está chamando nossa diretiva, ele irá executar essa função
    //nativeElement -> Pegamos o elemento do DOM
    //setElementStyle -> Param1 (Elemento do DOM), Param2 (Qual propriedade CSS), Param3 (Qual valor que será dessa propriedade)
    @HostListener('mouseover')
    darkenOn(){
        this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff(){
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }


}