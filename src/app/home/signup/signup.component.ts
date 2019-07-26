import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';

@Component({
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit{
    
    signupForm: FormGroup;
    
    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignUpService,
        private router: Router){ }
    
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

    }


    signup(){
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