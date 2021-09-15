import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { EventService, IEvent, ISession, } from "../shared/index";


@Component({
    templateUrl: './event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a { cursor: pointer }
    `]
})
export class EventDetailsComponent implements OnInit {

    event!: IEvent
    addMode!: boolean
    filterBy: string = 'all'
    sortBy: string = 'votes'

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let eventTest = this.eventService.getEvent(+params['id'])
            if (eventTest != undefined) {
                this.event = eventTest
            }
            this.addMode = false
        })
    }

addSession() {
    this.addMode = true
}

saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event?.sessions.map(s => s.id))
    session.id = nextId + 1
    this.event.sessions.push(session)
    this.eventService.updateEvent(this.event)
    this.addMode = false
}

cancelAddSession() {
    this.addMode = false
}

}