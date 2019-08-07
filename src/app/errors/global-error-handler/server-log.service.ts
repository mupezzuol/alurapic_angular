import { HttpClient } from '@angular/common/http';
import {Injectable } from "@angular/core";

import { ServerLog } from './server-log';
import { environment } from '../../../environments/environment'

const API = environment.serverLog;//Var setado em 'environment' de config de build da aplicação

@Injectable({ providedIn: 'root'})
export class ServerLogService {

    constructor(private http: HttpClient) {}

    //API do back-end que recebe o log do Angular que tratamos em nosso Handler, aqui fazemos um POST para a API
    log(serverLog: ServerLog) {
        return this.http.post(API + '/infra/log', serverLog);
    }

}