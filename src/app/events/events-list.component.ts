import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IEvent } from ".";

@Component({
    template: `
        <div>
            <h1>Upcoming Angular Events</h1>
            <hr />
            <div class="row">
                <div *ngFor="let event of events" class="col-md-5">
                    <event-thumbnail [event]="event"></event-thumbnail>
                </div>
            </div>
        </div>
    `
})
export class EventsListComponent implements OnInit {

    events!: IEvent[]

    constructor(
        private route: ActivatedRoute) {        
    }

    ngOnInit() {
            this.events = this.route.snapshot.data['events']
    }

}