import { ValidatorFn, FormGroup } from "@angular/forms";

export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => {
    
    //Resgato meu userName + password dos inputs através do meu FormGroup
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;

    //Se o UserName for DIFERENTE de password, eu retorno NULL que significa que está OK. (null é usado para dizer que não deu nenhum erro)
    //Caso contrário eu retorno um obj com atributo 'userNamePassword' com valor TRUE
    // O atributo 'userNamePassword' é usamos para ser validado no HTML, como exemplo: *ngIf="signupForm.errors?.userNamePassword"
    return userName != password ? null : { userNamePassword: true };
};