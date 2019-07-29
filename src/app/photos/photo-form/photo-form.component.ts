import { PhotoService } from './../photo/photo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;

  constructor(
      private formBuilder: FormBuilder,
      private photoService: PhotoService,
      private router: Router) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true] //Valor inicializado será TRUE, ou seja, virá ticado, porém não terá validação nenhuma
    });
  }

  upload(){
    const desc = this.photoForm.get('description').value;//Pegando valor solto
    const allowComments = this.photoForm.get('allowComments').value;//Pegando valor solto

    this.photoService
      .upload(desc, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']));

  }


}
