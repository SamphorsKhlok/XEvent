import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';

import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  FormResult;
  profileForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService) {
    this.createForm();
    //console.log('is admin'+ this.profileService.isAdmin(this.authService.getUserID()));
    this.profileService.getUser(this.authService.getUserID())
      .subscribe(
      r => {
        let d = JSON.parse(r.userData);
        if (d[0]) {
          this.profileForm.controls['name'].setValue(d[0].name);
          const myDate = new Date(d[0].dob);
          this.profileForm.controls['dob'].setValue(myDate.getMonth() + '/' + myDate.getDate() + '/' + myDate.getFullYear());
          this.profileForm.controls['skill'].setValue(d[0].skill);
          this.profileForm.controls['education'].setValue(d[0].education);
          this.profileForm.controls['bio'].setValue(d[0].bio);
          this.profileForm.get('address').setValue({
            state: d[0].address.state,
            city: d[0].address.city,
            street: d[0].address.street,
            zip: d[0].address.zipcode
          });
        }
        //console.log('token: '+ this.authService.getToken());
      }
      );
  }

  ngOnInit() { }

  createForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
        street: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      dob: ['', Validators.required],
      skill: ['', Validators.required],
      education: ['', Validators.required],
      bio: ['', Validators.required]
    });
  }

  submitForm() {
    //console.log('update invoked.' + this.profileForm.get('address').get('state').value)
    const fdata = {
      userID: this.authService.getUserID(),
      //email: "u1@gmail.com",
      name: this.profileForm.get('name').value,
      address: {
        city: this.profileForm.get('address').get('city').value,
        state: this.profileForm.get('address').get('state').value,
        zipcode: parseInt(this.profileForm.get('address').get('zip').value),
        street: this.profileForm.get('address').get('street').value,
      },
      dob: this.profileForm.get('dob').value,
      skill: this.profileForm.get('skill').value,
      education: this.profileForm.get('education').value,
      bio: this.profileForm.get('bio').value,
      enabled: 1,
      role: 1
    };
    //console.log('token '+this.authService.getUserToken());
    this.profileService.updateProfile(fdata, this.authService.getUserToken()).subscribe(r => {
      if (r.status === 1) {
        this.FormResult = "Profile Updated Successfully.";
      } else {
        this.FormResult = r.status;
      }
    }
    );

  }

}
