import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

import * as StackTrace from 'stacktrace-js';
import { environment } from '../../../environments/environment'
import { ServerLogService } from './server-log.service';
import { UserService } from './../../core/user/user.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

    constructor(private injector: Injector) { }

    handleError(error: any): void {
        console.log('Global Error Handler');
        
        //Injeção de dependencia sem utilizar o constructor, pois se der pau no constructor o Handler não será chamado
        // LocationStrategy -> é responsavel por pegar diversos tipos de Location, path de url e etc...
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);//Injeção de UserService
        const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        // Atribuo para URL caso  o location seja da mesma instancia de 'PathLocationStrategy', pois essa instancia possui o método 'path()' que retorna a URL requisitada
        const url = location instanceof PathLocationStrategy ? location.path() : '';


        //Se tem error.message é pq é uma instancia de erro, portanto existe a propriedade 'message', caso contrário só converte o erro em String
        const message = error.message ? error.message : error.toString();

        //Redireciono o usuário para página de Error Global caso o ambiente seja de PRODUÇÃO
        //Se for DEV, ele continua o fluxo, justamente para ajudar o desenvolvedor caso de erro em algum lugar ele ver de cara o erro
        if (environment.production) router.navigate(['/error']);
        

        //StackTrace -> biblioteca que nos ajuda a mostrar o mesmo erro em todos os tipos de navegadores diferentes
        //fromError -> Instancia de erro, dentro dela eu recebo um array, cada item do array é 'frame' e eu pego chamando 'then()' pois é um promise
        //stackFrames -> é o retono do THEN, ou seja, meu array, cada item dele é um frame com os erros etc... porém queremos trata-los para ficar mais visivel
        StackTrace
            .fromError(error)
            .then(stackFrames => {

                //Eu faço um MAP nesse ARRAY retornado pelo then();
                //Eu uso o MAP para converter esse item em string, depois no final eu faço um 'join('\n')' que ao final da string convertida ele pula uma linha
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');

                console.log(message);
                console.log(stackAsString);//Printo minha String montado de acordo com os 'stackFrames'

                
                //Mensagem que será enviado para o servidor back-end que está preparado para receber esse objeto com as info de: message, url, userName, stack
                //Lembrando que no JSON quando minha chave "chave" : "valor" é o mesmo nome eu posso somente passar o valor, nesse caso: message e url
                console.log('Enviando LOG para API do back-end: ');
                //O método log espera um tipo 'LogServer' porém esse objeto tem o mesmo 'shape', mesmo campos da interface, por isso ele não gera erro
                serverLogService.log({
                    message,
                    url,
                    userName: userService.getUserName(),
                    stack: stackAsString
                }).subscribe( 
                    () => {
                        console.log('LOG enviado com sucesso para o servidor de log.');
                    },
                    err => {
                        console.log('Erro ao enviar LOG para o servidor de log.');
                        console.log(err);
                    })

            });
        
    }

}