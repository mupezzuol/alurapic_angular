import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    //PARA O INTERCEPTADOR FUNCIONAR É PRECISO CONFIGURAR O PROVIDER DELE NO MODULO QUE UTILIZA ESSE COMPONENT ETC...
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent |
            HttpHeaderResponse |
            HttpProgressEvent |
            HttpResponse<any> |
            HttpUserEvent<any>> {

            //Usamos o 'handle' para tratar algo, e parramos o req q é nossa requisição daquele momento que será interceptado
            //Usamos o PIPE + TAP (tratar algo no meio da requisicao e resposta) nele nós vamos o seguinte:
            //Se o event atual do tap, for a mesma instancia de RESPONSE é pq já foi respondido, então nós usamos 'stop' da barra de Loading
            //Se não for igual a isso é pq ainda está acontecendo a requisição, portanto usaremos o 'start'
            return next
                .handle(req)
                .pipe(tap(event => {
                    if (event instanceof HttpResponse) {
                        this.loadingService.stop();
                    } else {
                        this.loadingService.start();
                    }
                }))
    }


}