import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { AllService } from './all.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AllService]
})

export class AppComponent implements OnInit {
  title: any;
  AppUrl: any;
  constructor(private _r: Router, private _ser: AllService) { }
  ngOnInit() {
    this._r.events.subscribe(() => {
      this._ser.getUrl().subscribe((url) => { 
        this.AppUrl = url;
       });
    });
  }
  
}
