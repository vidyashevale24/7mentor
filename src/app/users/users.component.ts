import { Component, OnInit,AfterViewInit } from '@angular/core';
import { AllService } from "../all.service";
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [AllService]
})
export class UsersComponent implements OnInit,AfterViewInit {

  data = [
    { "name": "Gopal", "email": "a@b.com", "mobile": "898393926" },
    { "name": "Ganesh", "email": "a@c.com", "mobile": "898393926" },
    { "name": "Mahesh", "email": "a@d.com", "mobile": "898393926" },
    { "name": "Tusha", "email": "a@em", "mobile": "898393926" },
    { "name": "Manish", "email": "a@f.com", "mobile": "898393926" },
  ]
  date = new Date();
  users: any;
  res: any;
  pagination = ["next", 1, 2, 3, 4, 5, "prev"]
  constructor(private _ser: AllService,
    private _ar: ActivatedRoute,
    private _r: Router) { }

  ngOnInit() {

    this._ser.checkLife(environment.session_id).subscribe((res)=>{
      if(!res){
        this._r.navigate(['/login']);
      }
    });

    this._ser.setUrl(this._r.url);
    this._r.events.subscribe(() => {
      this._ser.checkLife(environment.session_id).subscribe((res)=>{
        if(!res){
          this._r.navigate(['/login']);
        }
      });
      this._ser.getUsers().subscribe((getuserresponse) => {
        this.users = getuserresponse;
      });
    });


    this._ser.getUsers().subscribe((getuserresponse) => {
      this.users = getuserresponse;
    });

    
  }

  ngAfterViewInit(){
    this._ser.setUrl(this._r.url);
    //console.log(this._r.url)
  }


  Delete(data) {
    this._ser.delete(data).subscribe((res) => {
      this.res = res;
      this._ser.getUsers().subscribe((getuserresponse) => {
        this.users = getuserresponse;
      });
      $("#msg").css("display", "block");
      setTimeout(function () {
        $("#msg").fadeOut(1000);
      }, 2000);
    });
  }

}
