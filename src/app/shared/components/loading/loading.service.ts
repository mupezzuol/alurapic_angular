import { LoadingType } from './loading-type';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoadingService{

    //Subject -> Emito um valor em um luxo X, e no lugar Y eu posso ficar escutando esse valor
    loadingSubject = new Subject<LoadingType>();

    getLoading(){
        //Quem pegar o Loading receberá um Observable já com o valor inicial setado como STOPPED
        //Observable não sabemos oq será emitido, porém usando o 'startWith' nós já dizemos que queremos que ele já inicio com aquilo, pois assim
        //Ao utilizao em um component chegará Stopped a principio
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED));
    }

    start(){
        //Caso alguém fique escutando esse Subject, ele irá escutar oq foi escrito através desse NEXT()
        this.loadingSubject.next(LoadingType.LOADING);//Inicio como LOADING que é um valor string 'loading'
    }

    stop(){
        //Caso alguém fique escutando esse Subject, ele irá escutar oq foi escrito através desse NEXT()
        this.loadingSubject.next(LoadingType.STOPPED);//Inicio como STOPPED que é um valor string 'stopped'
    }

}