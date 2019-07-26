import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit{
    
    signupForm: FormGroup;
    
    constructor(private formBuilder: FormBuilder){ }
    
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
                    Validators.pattern(/^[a-z0-9_\-]+$/), //Expressão regular para aceitar somente: deve começar com letra minuscula, e não pode iniciar com numero, mas no final pode
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ]
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

}   