import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ap-photo-details',
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit{
    
    constructor(private route: ActivatedRoute) { }
    
    ngOnInit(): void {
        //snapshot -> Fotografia atual de onde estou, componentes etc... ou seja, contexto atual que seria o rounterLink etc...
        //Params -> é para pegar os parametros que foram passados + o nome passado é o mesmo nome usado na URL (nome coringa) no arquivo de rotas ':photoId'
        const id = this.route.snapshot.params.photoId;
        alert('Id da foto é: ' + id);
    }
    
}