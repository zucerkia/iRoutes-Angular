import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  public isOpen: boolean;
  constructor() {
    this.isOpen = false;
  }
  ngOnInit() {
  }
  toggle(){
    this.isOpen = !this.isOpen;
  }
  calculateClasses(){
    return{"isOpen": this.isOpen};
  }
}
