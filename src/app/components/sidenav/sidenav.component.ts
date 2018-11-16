import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  commonRoutes:any = []
  indexCard:any = {};

  public isOpen: boolean;
  @ViewChild('map') map:MapComponent; 
  @ViewChild('card') card:CardComponent; 

  constructor() {
    this.isOpen = false;
  }
  ngOnInit() {
    this.map.mapEmitEvent
    .subscribe(res=>{
      this.commonRoutes = res;
    });

    // this.card.indexEmitEvent
    // .subscribe(res=>{
    //   console.log("cosas perro " + res);
    //   this.indexCard = res;
    // });
  }
  receiveIndex($event){
    this.indexCard = $event;
    console.log(this.indexCard);
  }
  toggle(){
    this.isOpen = !this.isOpen;
  }
  calculateClasses(){
    return{"isOpen": this.isOpen};
  }
}
