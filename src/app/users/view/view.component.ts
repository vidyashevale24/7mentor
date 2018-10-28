import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AllService } from '../../all.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [AllService]
})
export class ViewComponent implements OnInit, AfterViewInit {

  constructor(private _ser: AllService, private _ar: ActivatedRoute, private _r:Router) { }
  user: any;
  ngOnInit() {
    this._ser.setUrl(this._r.url);
    this._ar.params.subscribe(() => {
      this._ser.getUserById(this._ar.snapshot.params.id).subscribe((res) => {
        this.user = res;
      });
    });
  }
  ngAfterViewInit(){
    this._ser.setUrl(this._r.url);
  }

}
