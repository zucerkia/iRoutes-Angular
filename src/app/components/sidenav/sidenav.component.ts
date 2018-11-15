import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  commonRoutes:any = []

  public isOpen: boolean;
  @ViewChild('map') map:MapComponent; 
  constructor() {
    this.isOpen = false;
  }
  ngOnInit() {
    this.map.mapEmitEvent
    .subscribe(res=>{
      this.commonRoutes = res;
    });
  }
  toggle(){
    this.isOpen = !this.isOpen;
  }
  calculateClasses(){
    return{"isOpen": this.isOpen};
  }
}
