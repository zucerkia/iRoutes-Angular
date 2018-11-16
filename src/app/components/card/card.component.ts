import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardRoute:any;
  @Input() indexCard:number;
  @Output() indexEmitEvent = new EventEmitter<any>();
  visible:boolean = true;
  constructor() { }

  ngOnInit() {
  }

  sendIndex(){
    this.visible=!this.visible;
    this.indexEmitEvent.emit({index:this.indexCard, visible: this.visible});
  }
}
