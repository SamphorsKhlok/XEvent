import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ProfileService} from "../../services/profile.service";
import {LocalStorageService} from "ng2-webstorage";
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = [];
  selectedData;
  skip: number = 0;
  userInfo = {};

  @ViewChild('filter') filter: ElementRef;
  constructor(private http: HttpService,
              private profile: ProfileService,
              private localStorageService: LocalStorageService,
              public dialog: MdDialog,
              private authService: AuthService) {
    this.userInfo = JSON.parse(this.localStorageService.retrieve('userinfo'));
  }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(){
    this.http.getEvents(this.skip).subscribe(
      (data)=> {
        this.data = this.data.concat(data);
        //console.log(this.data);
        this.skip++;
      },
      (error)=> console.error(error),
      ()=> {
        console.info("fetching event completed")
      }
    );
  }

  selectedItem(index){
    this.selectedData = this.data[index];
    //console.log(this.selectedData);
  }

  onScroll () {
    //console.log('scrolled!!');
    this.getEvent();
  }

  filterByKeyword(keyword){

    this.http.searchEvents(0 , keyword).subscribe(
      (data)=> {
        //clear form data
        this.reset();
        this.data = this.data.concat(data);
      },
      (error)=> console.error(error),
      ()=> {
        console.info("fetching event completed")
      }
    );
  }

  reset(){
    this.data = [];
    this.selectedData = {};
  }

  register(event){
    if(this.userInfo){
      this.openDialog(this.userInfo, event);
    }
  }

  viewEvent(id){
    //get this id detail;
  }

  //open dialog for registration
  openDialog(userInfo, event): void {
    let dialogRef = this.dialog.open(DialogRegister, {
      width: '400px',
      data: { userInfo: userInfo , event : event, isRegister : false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result.isRegister);
      //this.animal = result;
      if(result.isRegister){
        let data = {
          userID : result.userInfo.uid,
          eventID : result.event._id
        };

        this.http.registerUser(data).subscribe(
          (data)=> {
            console.log(data);
          },
          (error)=> console.error(error),
          ()=> {
            console.info("register event completed")
          }
        );
      }
    });
  }

  //signup if there is no localStorage
  signUp(){
    this.authService.login();
  }

}

@Component({
  selector: 'dialog-register',
  templateUrl: 'dialog-register.html',
})
export class DialogRegister {

  constructor(
    public dialogRef: MdDialogRef<DialogRegister>,
    @Inject(MD_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  yes(){
    this.data.isRegister = true;
    return this.data;
  }

}
