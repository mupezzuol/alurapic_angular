import { LoadingService } from './loading.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingType } from './loading-type';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ap-loading',
    templateUrl: './loading.component.html'
   // styleUrls: ['./loading.compoennt.css']
})
export class LoadingComponent implements OnInit{

    //Lembre-se que qnd tem '$' é pq é um Observable
    loading$: Observable<string>;//String pois nós convertemos com MAP o valor do ENUM para adicionar na class do HTML
    
    constructor(private loadingService: LoadingService) { }
    
    ngOnInit(): void {
        
        this.loadingService
            .getLoading()
            .pipe(map( loadingType => loadingType.valueOf()));//Convertemos com 'map()' oq vem de resposta para String com 'valueOf'.. Será ou 'loading' ou 'stopped'

    }
    
}