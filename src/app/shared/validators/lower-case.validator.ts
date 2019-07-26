import { AbstractControl } from '@angular/forms';

//Validando algum campo do formulário, essa função sempre terá que receber um 'AbstractControl'
export function lowerCaseValidator(control: AbstractControl){

    //Expressão regular para aceitar somente: deve começar com letra minuscula, e não pode iniciar com numero, mas no final pode
    if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)){
        return { lowerCase: true};//Objeto com o Key+Value. O Key é usado no template
    }

    return null;//Retorna NULL, ou seja não validou
}