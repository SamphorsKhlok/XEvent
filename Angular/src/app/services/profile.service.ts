import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request } from '@angular/http';
import 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';

@Injectable()
export class ProfileService {
  //private userUrl = 'http://localhost:3000/users/';
  private userUrl = 'https://dry-springs-92534.herokuapp.com/users/';
  constructor(private http: Http, private localStorageService: LocalStorageService) { }

  getUser(id) {
    if (id) {
      return this.http.get(this.userUrl + id)
        .map(res => res.json());
    } else {
      return null;
    }
  }

  saveForFirstTime(id, email, fbToken) {
    const formData = {
      userID: id,
      name: "",
      email: email,
      address: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
      },
      dob: "",
      skill: "",
      education: "",
      bio: "",
      enabled: 1,
      role: 1
    };
    return this.http.post(this.userUrl + 'add', {formData, fbToken})
      .map(res => res.json());
  }

  updateProfile(formData, fbToken) {
    return this.http.post(this.userUrl + 'update', { formData, fbToken })
      .map(res => res.json());
  }

  isAdmin(id) {
    if (this.localStorageService.retrieve('urole') === 2) {
      return true;
    } else {
      return false;
    }
    /*this.getUser(id).subscribe(
      r => {
        let d = JSON.parse(r.userData);
        if (d[0].role === 2) {
          return true;
        } else {
          return false;
        }
      },
      err => {
        console.log(err);
        return false;
      }
    );*/
  }
}
