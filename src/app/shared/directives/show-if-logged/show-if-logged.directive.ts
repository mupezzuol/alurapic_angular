import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

import { UserService } from './../../../core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    currentDisplay: string;//Tela atual

    // Renderer -> É uma abstração para modificarmos propriedades do DOM.
    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) { }


    ngOnInit(): void {
        //Pego o estilo atual do Display e quando numa string
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;

        //Chamo o servico de user para verificar se o usuário ta logado ou não está logado
        this.userService.getUser().subscribe(user => {

            //Se tem 'user' é pq ele está logado, portanto o 'display' será renderizado de acordo com o display atual, ou seja, respectivo, mantém normal
            //Caso contrário, é pq o usuário não está logado, portanto atribuo o valor do display novo ao display, e depois seto com renderer um display none,
            //ou seja, para esconder, pois ele não está logado
            if (user) {
                this.renderer.setElementStyle(this.element.nativeElement, 'display', this.currentDisplay);//Torna o cara visivel
            } else {
                this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
                this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');//Torna o INvisivel
            }
        });
    }

}