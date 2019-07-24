import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

//Usando 'providedIn' quem for usar não irá precisar importar módulos etc..
@Injectable({
    providedIn: 'root'
})
export class PlatformDetectorService{

    //Injeto a plataforma, se é browser, server side etc... Injetamos usando o 'PLATFORM_ID' do Angular
    constructor(@Inject(PLATFORM_ID) private platformId: string){ }

    isPlatformBrowser(){
        //Chamo método do Angular que irá nos retornar se estamos exetuando o código na plataforma web, ou seja no Browser
        return isPlatformBrowser(this.platformId);
    }

}