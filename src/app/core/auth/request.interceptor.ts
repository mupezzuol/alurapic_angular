import { TokenService } from './../token/token.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';

//Para nós interceptarmos as requisicoes precisamos implementar 'HttpInterceptor'
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        //Se tiver token é pq está logado e autenticado
        if (this.tokenService.hasToken()) {
            //Resgato o Token
            const token = this.tokenService.getToken();

            //Faço um clone da requisição para eu adicionar mais informações na requisição
            //Adicionou um objeto novo que é o 'Headers' dentro dele nós enviamos mais um objeto
            // Esse objeto é composto por key + value (igual o postman faz para nós)
            // Nesse casso eu digo que estou adicionando no header da requiscao o 'x-access-token' e o valor dele que é o token resgatado
            req = req.clone({
                setHeaders: {
                    'x-access-token': token
                }
            });
        }

        //Retorno a request clonada COM ou SEM token sendo passado no Header
        return next.handle(req);
    }

}