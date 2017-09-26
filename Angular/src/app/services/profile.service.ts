import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProfileService {
  private userUrl = 'http://localhost:3000/users/';
  constructor(private http: Http) {

  }

  getUser(id) {
    if (id) {
      return this.http.get(this.userUrl + id)
        .map(res => res.json());
    } else {
      return null;
    }
  }

  saveForFirstTime(id, email) {
    const fData = {
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
    return this.http.post(this.userUrl + 'add', fData)
      .map(res => res.json());
  }

  updateProfile(formData) {
    return this.http.post(this.userUrl + 'update', { formData })
      .map(res => res.json());
  }

}
