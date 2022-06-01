import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-social',
  templateUrl: './event-social.component.html',
  styleUrls: ['./event-social.component.css']
})
export class EventSocialComponent implements OnInit {

  @Input() event: any;
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  like() {
    this.notify.emit(this.event);
  }

}