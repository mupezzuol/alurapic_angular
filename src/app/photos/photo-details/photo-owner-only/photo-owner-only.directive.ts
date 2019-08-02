import { UserService } from './../../../core/user/user.service';
import { element } from 'protractor';
import { Photo } from './../../photo/photo';
import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit{
    
    @Input() ownedPhoto: Photo;
    
    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
        ) { }
        
    ngOnInit(): void {
        
        //Resgato o usuário e comparo se é o mesmo usuário do done da foto
        //Se o usuário for DIFERENTE eu deixo o botão dessa diretiva invisivel para não excluir a foto, caso contrário segue o fluxo
        // !user -> Verifico se o user é null ou não para não deixar furo na validação caso seja null
        this.userService
            .getUser()
            .subscribe(user => {
                if(!user || user.id != this.ownedPhoto.userId){
                    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none')
                }

            });
        


    }

}