import { Component } from "@angular/core";
import { EventService, ISession } from "../events";
import { AuthService } from "../user/auth.service";

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles: [`
        .nav.navbar-nav { font-size: 15px; }
        #searchForm { margin-right: 100px; }
        @media (max-widdth: 1200px) { #searchForm { display:none } }
        li > a.active { color: #F97924 }
    `]
})
export class NavBarComponent {

    searchTerm: string = ""
    foundSessions!: ISession[]

    constructor(
        public auth: AuthService,
        private eventService: EventService) {
    }

    searchSessions(searchTerm: string) {
        this.eventService.searchSessions(searchTerm)
            .subscribe((sessions: ISession[]) => {
                this.foundSessions = sessions
                console.log(this.foundSessions)
            })
    }

}