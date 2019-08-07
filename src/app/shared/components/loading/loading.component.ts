import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Component({
    selector: 'ap-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    //Lembre-se que qnd tem '$' é pq é um Observable
    loading$: Observable<string>;//String pois nós convertemos com MAP o valor do ENUM para adicionar na class do HTML

    constructor(private loadingService: LoadingService) { }

    ngOnInit(): void {

        //Sempre lembrar q um '$' sempre precisar receber um observable se não no HTML não acontecerá nada
        //getLoading -> Pego o Loading, retornando um Observable já setado como STOPPED
        //Uso o PIPE + MAP para converter o retorno desse observable em um LoadingType em formato String, para ser atribuido a uma classe no html com 'ngClass'
        this.loading$ = this.loadingService
            .getLoading()
            .pipe(map(loadingType => loadingType.valueOf()));//Convertemos com 'map()' oq vem de resposta para String com 'valueOf'.. Será ou 'loading' ou 'stopped'

    }

}