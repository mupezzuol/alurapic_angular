import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate{

    constructor(
        private userService: UserService,
        private router: Router){ }
    

    //O retorno desse método pode ser: boolean OR Observable OR Promise
    //Quandoe eu acessar a ROTA de login ele irá chamar esse método e fazer a verificação necessária
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
            //Se o usuário tiver logado nós adicionamos a rota que o usuário irá ser redirecionado
            if(this.userService.isLogged()){
                //Direciono o usuário para uma nova Rota
                this.router.navigate(['user', this.userService.getUserName()])//URL -> /user/userName

                //Retorno false para dizer que a rota SignIn para ir para o login não será processada
                return false;
            }

            //Se não tiver logado é pq ele fará o login ainda, ou seja, a Rota de LOGIN será processada
            return true;
    }

}