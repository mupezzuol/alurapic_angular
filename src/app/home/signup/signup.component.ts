import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';


//Se alguém pedir pra injetar o 'UserNotTakenValidatorService' eu digo que eu vou prover esse cara
@Component({
    templateUrl: './signup.component.html',
    providers: [
        UserNotTakenValidatorService
    ]
})
export class SignUpComponent implements OnInit{
    
    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
    
    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService){ }
    
    ngOnInit(): void {

        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['',
                [
                    Validators.required,
                    lowerCaseValidator, //Criamos um validator personalizado
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken() //Colocamos como 3º Param, pois é nele que colocamos validações ASSÍNCRONAS
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ] 
            ]
        });

        this.platformDetectorService.isPlatformBrowser() &&
                        this.emailInput.nativeElement.focus();

    }


    signup(){
        //Verifica se o formulário passou pelas validações, ele só irá processar se o form for VALIDO && NÃO está PENDENTE
        // signupForm.pending -> Esperando retorno de validações assincronas, como por exemplo a validação de usuarios existentes que é uma req assincrona
        if(this.signupForm.valid && !this.signupForm.pending){

            // -> Pega todos os valores do inputs de acordo com o key adquirido no formControlName 'email, fullName, userName, password'
            const newUser = this.signupForm.getRawValue() as NewUser;//Faço cast para 'NewUser'

            //Subscribe: 1º param é o retorno qnd deu CERTO e o 2ª é o retorno do Error quando algo aconteceu
            this.signupService
                .signup(newUser)
                .subscribe(() => {
                    this.router.navigate(['']),
                    err => console.log('err')
                })
        }
    }



}   