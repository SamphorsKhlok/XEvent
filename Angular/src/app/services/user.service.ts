import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request } from '@angular/http';
import 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  private userUrl = 'http://localhost:3000/users/';
  constructor(private http: Http, private authService: AuthService) { }

  getUser(id) {
    if (id) {
      return this.http.get(this.userUrl + id)
        .map(res => res.json());
    } else {
      return null;
    }
  }

  getUsers(start, perpage) {
    return this.http.get(this.userUrl + 'list/' + start + '/' + perpage)
      .map(res => res.json());
  }

  changeRole(targetUserId, targetRoleId) {
    const fbToken = this.authService.getUserToken();
    const formData = {
      userID : this.authService.getUserID(),
      targetUserId : targetUserId,
      targetRoleId : targetRoleId,
    };
    return this.http.post(this.userUrl + 'changerole', { formData, fbToken })
    .map(res => res.json());
  }

  changeAccessLevel(targetUserId, accessId) {
    const fbToken = this.authService.getUserToken();
    const formData = {
      userID : this.authService.getUserID(),
      targetUserId : targetUserId,
      accessId : accessId,
    };
    return this.http.post(this.userUrl + 'changeaccess', { formData, fbToken })
    .map(res => res.json());
  }

  /*
  saveForFirstTime(id, email, fbToken) {
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
    return this.http.post(this.userUrl + 'add', {fData, fbToken})
      .map(res => res.json());
  }

  updateProfile(formData, fbToken) {
    return this.http.post(this.userUrl + 'update', { formData, fbToken })
      .map(res => res.json());
  }*/

}
