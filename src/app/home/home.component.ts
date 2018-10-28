import { Component, OnInit, Output, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from '../all.service';
import { trigger, state, animate, transition, style } from '@angular/animations';
 
// export const fadeInAnimation =
//   trigger('fadeInAnimation', [
//         transition(':enter', [
//             style({ opacity: 0 }),
//             animate('4s', style({ opacity: 1 }))
//         ]),
//   ]);

    
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AllService],
  //animations: [fadeInAnimation]
})

export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private _r:Router,private _ser: AllService) { }
 
  ngOnInit() {
    
  }
  ngAfterViewInit(){
    this._ser.setUrl(this._r.url);
  }

}
