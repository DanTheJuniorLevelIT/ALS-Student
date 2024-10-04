import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-inputcheckers',
  standalone: true,
  imports: [RouterModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditorComponent, MatRadioModule, CommonModule, ReactiveFormsModule],
  templateUrl: './inputcheckers.component.html',
  styleUrl: './inputcheckers.component.css'
})
export class InputcheckersComponent implements OnInit {

  constructor () {}

  ngOnInit(): void {
      
  }

  answerForm = new FormGroup({
    answer: new FormControl(''),
    identification: new FormControl(''),
  })

  onSubmit() {
    console.log(this.answerForm.value);
  }
}
