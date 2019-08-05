import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

import { UserService } from './../../../core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit{
    
    // Renderer -> É uma abstração para modificarmos propriedades do DOM.
    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
        ) { }
        
    ngOnInit(): void {
        //Se ele NÃO tiver logado o elemento recebe um display none para ser oculto a visibilidade
        !this.userService.isLogged()
            && this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    }

}