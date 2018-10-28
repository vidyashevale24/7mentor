import { Component, OnInit } from '@angular/core';
import {AllService} from '../all.service'
import { ActivatedRoute , Router} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AllService]
})
export class LoginComponent implements OnInit {

  logForm={
    email:"",
    password:""
  }
  constructor(private _ser:AllService, private _r:Router) { }

  ngOnInit() {
    this._ser.setUrl(this._r.url);
    this._ser.checkLife(environment.session_id).subscribe((res)=>{
      console.log(res);
      if(res){
        this._r.navigate(['/users']);
      }
    });
  }
  OnSave(data){
    console.log(data);
    this._ser.login(data).subscribe((res)=>{
      console.log(res);
      environment.session_id = res['session_id'];
      if(res['life']=="true"){
        this._r.navigate(['/users']);
      }
    });
  }

}
