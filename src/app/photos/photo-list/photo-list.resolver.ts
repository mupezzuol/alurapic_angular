import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Injectable({ providedIn: 'root'})
export class PhotoListResolver implements Resolve<Observable<Photo[]>>{

    constructor(private photoService: PhotoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //Fotografia de onde estamos agora URL atual
        const userName = route.params.userName;

        return this.photoService.listFromUserPaginated(userName, 1);
    }

}