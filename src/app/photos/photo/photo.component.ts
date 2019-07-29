import { Component, Input } from '@angular/core';

//Servidor de hospedagem das fotos (back-end ou cloud)
const cloud = 'http://localhost:3000/imgs/';

@Component({
    selector: "ap-photo",
    templateUrl: 'photo.component.html'
})
export class PhotoComponent{
    
    private _url: string = ''; //Aux para nossos Get/Set customizados

    //@input -> Inbound Properties -> Aceitam receber um valor por meio de sua forma declarativa
    //Crio um Setter customizado, sobrescrevendo o default
    //exemplo: exemploComponent.url = 'texto' (por trás dos panos ele chama esse set)
    @Input() set url(url: string){

        //IMAGEM CLOUD: http://localhost:3000/imgs/d63f58b8-f4a4-43f0-badd-c622e3f4fe5b.JPG
        //IMAGEM URL: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE.....
        if(url.startsWith('data')) {
            this._url = url;
        } else {
            this._url = cloud + url;
        }
    }

    //Crio um Getter customizado...
    //exemplo: exemploComponent.url (por trás dos panos ele chama esse get)
    get url(){
        return this._url;
    }

    @Input() description = '';

    

}