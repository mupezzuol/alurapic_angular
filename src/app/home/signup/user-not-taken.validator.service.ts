import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { SignUpService } from './signup.service';

@Injectable({ providedIn: 'root' })
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkUserNameTaken() {

        //Esse método retorna uma FUNCTION que retorna um OBSERVABLE
        //Nele nós fazemos nossa validação, atribuimos as chaves pro Validator 'userNameTaken' etc...
        //A cada 3 segundos ele bate no back-end enviando o usuário que veio do 'control.valueChanges' que é o valor do inputs de acordo com as mudanças
        //First() -> O primeiro valor que você emitir e vou completar esse cara, ou seja, fazer o precesso completo do método, se não toda vez a cada 3 segundos 
        //ele irá ficar pegando valor que já foi alterado no input
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName =>
                    this.signUpService.checkUserNameTaken(userName)
                ))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(first());
    }
    }
}