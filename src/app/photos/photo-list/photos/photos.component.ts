import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() { }

  //Se tiver mudança executará esse método
  ngOnChanges(changes: SimpleChanges) {
    //Se existir changes.photos é pq houve mudança nessa propriedade, e fará a atualização
    //Um objeto do tipo SimpleChanges possui uma propriedade de mesmo nome da inbound property que sofreu mudança.
    if (changes.photos)
      this.rows = this.groupColumns(this.photos);
  }

  groupColumns(photos: Photo[]) {
    const newRows = [];

    //Separo por fatia em 3 elementos em um array -> Array posição zero terá 3 objetos etc...
    for (let index = 0; index < photos.length; index += 3) {
      newRows.push(photos.slice(index, index + 3));
    }
    return newRows;
  }


}
