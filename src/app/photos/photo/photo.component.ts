import { Component, Input } from '@angular/core';

@Component({
    selector: "ap-photo",
    templateUrl: 'photo.component.html'
})
export class PhotoComponent{

    //@input -> Inbound Properties -> Aceitam receber um valor por meio de sua forma declarativa
    @Input() url = '';
    @Input() description = '';

}