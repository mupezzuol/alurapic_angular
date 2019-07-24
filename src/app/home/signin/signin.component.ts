import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;

    //Acesso elemento do DOM do filho, ou seja, do HTML desse Component. No html eu adc '#userNameInput' em qualquer elemento e resgato com @ViewChild
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>; 

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private route: Router) {

    }

    ngOnInit(): void {

        //Pegando os valores do Formulário (No form existe a diretiva 'formControlName') e aplica os Validators (required, max, min etc...)
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {

        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        //1º param -> Sucesso, ou seja, dados retornados. 2º param -> Error
        this.authService.authenticate(userName, password)
            .subscribe(
                () => {
                    console.log(`Usuário ${userName} autenticado com sucesso.`);
                    this.route.navigate(['user', userName]);//Ele fará a concatenação da URL com os valores que serão alterados dinamicamente
                    // Forma simples -> this.route.navigateByUrl('user/' + userName);
                },
                err => {
                    console.log('ERRO DE AUTENTICAÇÃO: ' + err.message);
                    this.loginForm.reset();//Limpa o formulário
                    this.userNameInput.nativeElement.focus();
                    alert('Username or Password is incorrect!');
                });

    }


}