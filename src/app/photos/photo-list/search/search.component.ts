import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    debounce: Subject<string> = new Subject<string>();

    ngOnInit(): void {
        //RxJS utilizando Subject
        //Adiciono o valor no 'next' do debounce e atribuo para o Filter, mesma forma que as normais, porém usando debounce posso utilizar esse PIPE
        //Usando PIPE nós conseguimos atribuir tempo de busca do filter, dessa forma melhora a perfomace na busca
        this.debounce
            .pipe(debounceTime(300));
    }

    //O componente é destruido quando eu acesso uma outra rota, aí essa componente é destruido
    //Quando meu Component for destruido ele limpará o debounce para liberar memória
    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }

}