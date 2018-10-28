import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../all.service';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
  providers: [AllService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  res: any;
  id: any;
  btn:any = "Register";

  constructor(private _fb: FormBuilder, 
              private _ser: AllService, 
              private _ar: ActivatedRoute,
              private _r: Router) {
    this.registerForm = this._fb.group(
      {
        name: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}[ ]{1}[a-zA-Z]{3,}")]],
        email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]{3,}[@]{1}[a-zA-Z]{3,}[.]{1}[a-zA-Z0-9]{2,}")]],
        mobile: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
        password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,10}$")]],
        address: this._fb.group({
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
        }),
        id: [],
        status:[],
      }
    )
  }

  ngOnInit() {
    this._ser.setUrl(this._r.url);
    this.id = this._ar.snapshot.params.id;
    if (this._ar.snapshot.params.id!=undefined && this._ar.snapshot.params.id != null && this._ar.snapshot.params.id != "") {
      this.btn = "Update"
      this._ar.params.subscribe(() => {
        this._ser.getUserById(this._ar.snapshot.params.id).subscribe((res) => {
          this.registerForm.patchValue(res);
          this.registerForm.controls.address['controls']['city'].patchValue(res.city);
          this.registerForm.controls.address['controls']['state'].patchValue(res.state);
        });
      });
    }
  }

  OnSave(data) {
    console.log(data);
    if (data.id == null || data.id == "") {
      this._ser.register(data).subscribe((res) => {
        console.log(res);
        this.res = res;
        $("#msg").css("display", "block");
        setTimeout(function () {
          $("#msg").fadeOut(1000);
        }, 2000);
      });
    }else{
      this._ser.update(data).subscribe((res) => {
        console.log(res);
        this.res = res;
        $("#msg").css("display", "block");
        setTimeout(function () {
          $("#msg").fadeOut(1000);
        }, 2000);
        this._r.navigate(['/users']);
      });
    }
  }
}
