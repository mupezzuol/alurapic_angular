import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(
        private userService: UserService,
        private router: Router){ }
    

    //O retorno desse método pode ser: boolean OR Observable OR Promise
    //Quandoe eu acessar a ROTA de login ele irá chamar esse método e fazer a verificação necessária
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
            //Se você não está logado você será jogado para tela de login, ou seja, esse GUARD é para colocar nas telas que precisa estar autenticado para acessar
            if(!this.userService.isLogged()){
                //URL -> '' (home)
                this.router.navigate(
                    [''],
                    {
                      queryParams: {
                          fromUrl: state.url
                      }  
                    })
                return false;
            }

            return true;
    }

}