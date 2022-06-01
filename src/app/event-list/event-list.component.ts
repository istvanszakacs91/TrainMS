import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventTable } from './events';
import { EventService } from '../event.service';
import { Observable, Observer, fromEvent, of, Subscription} from 'rxjs';
import { switchMap,catchError, map,startWith,debounceTime, retry ,tap} from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  constructor(private eventService: EventService) { }

  events: any[] = [];
  eventsSub: Subscription;

  ngOnInit() {
    this.eventsSub = this.eventService.getEvents()
    .subscribe(result => this.events = result);
  }

  ngOnDestroy() {
    if(this.eventsSub) this.eventsSub.unsubscribe();
  }

  onDeleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId)
    .pipe(
      switchMap(res => this.eventService.getEvents())
    )
    .subscribe(result => this.events = result);
  }

  onNotify(event){
    alert('Event \'' + event.name + '\' liked');
  }

}