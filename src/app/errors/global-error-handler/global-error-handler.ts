import { ErrorHandler } from '@angular/core';
import * as StackTrace from 'stacktrace-js';

export class GlobalErrorHandler implements ErrorHandler{
    
    handleError(error: any): void {
        
        console.log('Global Error Handler');

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

                //Printo minha String montado de acordo com os 'stackFrames'
                console.log(stackAsString);

            });
        
    }

}