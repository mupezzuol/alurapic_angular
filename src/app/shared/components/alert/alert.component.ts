import { AlertService } from './alert.service';
import { Component, Input } from '@angular/core';

import { Alert, AlertType } from './alert';

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent {

    @Input() timeout = 3000;//3 segundos
    alerts: Alert[] = [];//Inicializa como vazio

    constructor(private alertService: AlertService) {

        this.alertService
            .getAlert()
            .subscribe(alert => {
                //Se não tiver ALERT a lista recebe vazio
                if (!alert) {
                    this.alerts = [];
                    return;
                }

                //Se tem ALERT, nós adicionamos esse ALERT no array
                this.alerts.push(alert);
                setTimeout(() => this.removeAlert(alert), this.timeout);//Após 3 segundos nós removemos do ARRAY os alert já emitidos
            })
    }

    removeAlert(alertToRemove: Alert){
        //Use filter() quando: é preciso remover elementos indesejados com base em alguma(s) condição(ões).
        //  percorre o array da esquerda para a direita invocando uma função de retorno em cada elemento. 
        //O valor retornado deve ser um booleano que indica se o elemento será mantido ou descartado. 
        //Depois de todos os elementos terem sido analisados, filter() retorna um novo array com todos os elementos que retornaram como verdadeiro.

        //Faço a comparação com FILTER, se for um ALERT que já foi emitido ele remove da lista
        this.alerts = this.alerts.filter(alert => alert != alertToRemove);
    }

    getAlertClass(alert: Alert){
        //Vazio retorna sem class
        if (!alert) return '';
        
        //Se for um desses tipos de alert será retornado uma classe diferente do bootstrap para mensagem
        switch (alert.alertType){

            case AlertType.SUCCESS:
                return 'alert alert-success';
            case AlertType.WARNING:
                return 'alert alert-warning';
            case AlertType.DANGER:
                return 'alert alert-danger';
            case AlertType.INFO:
                return 'alert alert-info';
        }
    }


}