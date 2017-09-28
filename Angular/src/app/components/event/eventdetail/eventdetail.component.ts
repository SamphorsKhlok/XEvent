import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../services/http.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {
  myForm: FormGroup;
  @Input() selectedItem ;

  constructor(private fb: FormBuilder,
              private http: HttpService,
              public snackBar: MdSnackBar) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required ],
      description: ['',Validators.required],
      remark: ['',Validators.required],
      date: ['',Validators.required],
      address: this.fb.group({
        street: ['',Validators.required],
        city: ['',Validators.required],
        state: ['',Validators.required],
        zipcode: ['',Validators.required],
      }),
      location: ['',Validators.required],
      tags: ['',Validators.required],
      users: ['',Validators.required],
    });
  };

  submitForm(){
    this.http.addEvent().subscribe(
      (data)=> console.log(data),
      (error)=> console.error(error),
      ()=> console.info("completed")
    );
  }

  //TODO: form need to fix on page when scroll down far
  ngOnInit() {
  }

}
