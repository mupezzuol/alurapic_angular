import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    fromUrl: string;
    loginForm: FormGroup;

    //Acesso elemento do DOM do filho, ou seja, do HTML desse Component. No html eu adc '#userNameInput' em qualquer elemento e resgato com @ViewChild
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>; 

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private route: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        //Usamos o 'activatedRoute' para pegar o valor dos parametros da URL que tratamos no 'auth.guard.ts'
        //Usamos para se o usuario acessar a tela de add foto e não tem acesso, ao logar ele é redirecionado na tela de add foto
        //params.fromUrl; -> é a propriedade que setamos no 'auth.guard.ts' em 'queryParams'
        this.activatedRoute.queryParams
            .subscribe(params => this.fromUrl = params['fromUrl']);// Pode usar tb como: params.fromUrl


        //Pegando os valores do Formulário (No form existe a diretiva 'formControlName') e aplica os Validators (required, max, min etc...)
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.platformDetectorService.isPlatformBrowser() &&
                        this.userNameInput.nativeElement.focus();
    }

    login() {

        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        //1º param -> Sucesso, ou seja, dados retornados. 2º param -> Error
        this.authService.authenticate(userName, password)
            .subscribe(
                () => {
                    console.log(`Usuário ${userName} autenticado com sucesso.`);

                    //SE 'fromUrl' tiver dado é pq contém URL nele, portanto após login envio para essa URL especifica
                    //CASO CONTRÁRIO ngm acessou outra URL, está fazendo login direto, portanto mando para URL Default que definimos como a listagem de fotos
                    //navigateByUrl -> Usamos dessa forma pois virá uma URL já montada, por exemplo: '/p/add'. Forma simples -> this.route.navigateByUrl('user/' + userName);
                    //navigate -> Ele fará a concatenação da URL com os valores que serão alterados dinamicamente
                    this.fromUrl ?
                        this.route.navigateByUrl(this.fromUrl) : this.route.navigate(['user', userName]);

                },
                err => {
                    console.log('ERRO DE AUTENTICAÇÃO: ' + err.message);
                    this.loginForm.reset();//Limpa o formulário

                    //Verifico se está sendo executado na plataforma WEB, se for TRUE, ele executa o próximo comando do focus(), caso contrário ele não executa
                    //Usamos essa verificação para não gerar conflitos futuros
                    this.platformDetectorService.isPlatformBrowser() &&
                        this.userNameInput.nativeElement.focus();
                    alert('Username or Password is incorrect!');
                });

    }


}