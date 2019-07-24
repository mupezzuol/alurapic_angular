import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{
    
    loginForm: FormGroup;
    
    constructor(private formBuilder: FormBuilder){
        
    }
    
    ngOnInit(): void {

        //Pegando os valores do Formulário (No form existe a diretiva 'formControlName') e aplica os Validators (required, max, min etc...)
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    

}