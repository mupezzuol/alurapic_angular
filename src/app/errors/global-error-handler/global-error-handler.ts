import { UserService } from './../../core/user/user.service';
import { ErrorHandler, Injector, Injectable } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

    constructor(private injector: Injector) { }

    handleError(error: any): void {
        console.log('Global Error Handler');
        
        //Injeção de dependencia sem utilizar o constructor, pois se der pau no constructor o Handler não será chamado
        // LocationStrategy -> é responsavel por pegar diversos tipos de Location, path de url e etc...
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);//Injeção de UserService


        // Atribuo para URL caso  o location seja da mesma instancia de 'PathLocationStrategy', pois essa instancia possui o método 'path()' que retorna a URL requisitada
        const url = location instanceof PathLocationStrategy ? location.path() : '';


        //Se tem error.message é pq é uma instancia de erro, portanto existe a propriedade 'message', caso contrário só converte o erro em String
        const message = error.message ? error.message : error.toString();


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
                console.log('O que será enviado para o back-end: ');
                console.log({ 
                    message,
                    url,
                    userName: userService.getUserName(),
                    stack: stackAsString
                }); 

            });
        
    }

}