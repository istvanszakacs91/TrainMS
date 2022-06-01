import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable, Observer, fromEvent, ReplaySubject } from 'rxjs';
import { mergeMap, map, startWith, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Vasúti Rendszerkezelő';
}
