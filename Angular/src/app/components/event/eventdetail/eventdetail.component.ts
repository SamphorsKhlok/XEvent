import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

  }

  createForm() {
    // this.myForm = this.fb.group({
    //   name: ['', Validators.required ],
    //   description: ['',Validators.required],
    //   remark: ['',Validators.required],
    //   date: ['',Validators.required],
    //   address: this.fb.group({
    //     street: ['',Validators.required],
    //     city: ['',Validators.required],
    //     state: ['',Validators.required],
    //     zipcode: ['',Validators.required],
    //   }),
    //   location: ['',Validators.required],
    //   tags: ['',Validators.required],
    //   users: ['',Validators.required],
    // });

    this.myForm = new FormGroup({
      name : new FormControl(this.selectedItem.name ||'', Validators.required),
      description : new FormControl(this.selectedItem.description || "", Validators.required),
      remark : new FormControl(this.selectedItem.remark || "", Validators.required),
      date : new FormControl(this.selectedItem.date || "", Validators.required),
      address : new FormGroup({
        street: new FormControl( this.selectedItem.address.street || "",Validators.required),
        city: new FormControl( this.selectedItem.address.city || "",Validators.required),
        state: new FormControl( this.selectedItem.address.state || "",Validators.required),
        zipcode: new FormControl( this.selectedItem.address.zipcode || "",Validators.required),
        }),
      location : new FormControl(this.selectedItem.location || "", Validators.required),
      tags : new FormControl(this.selectedItem.tags || "", Validators.required),
      users : new FormControl(this.selectedItem.users || "",  Validators.required),
      urlImage : new FormControl(this.selectedItem.urlImage || "",  Validators.required)
    });
  };

  submitForm(){
    console.log(this.myForm.value);
    this.http.saveEvent(this.myForm.value, this.selectedItem._id).subscribe(
        (data)=> {
            console.log(data);
            this.snackBar.open("Save Successful", "Close" ,{
              duration: 2000,
            });
          },
        (error)=> {
          this.snackBar.open("Error" + error, "Close" ,{
            duration: 2000,
          });
        },
        () => {
          console.info("completed");
        }
    );
  }

  resetForm(){
    this.myForm.reset();
    this.selectedItem = {};
  }

  //TODO: form need to fix on page when scroll down far
  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(){
    this.createForm();
  }

}
