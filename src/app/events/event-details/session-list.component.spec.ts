import { SessionListComponent } from "."
import { ISession } from "../shared/event.model"

describe('SessionListComponent', () => {
    let component: SessionListComponent
    let mockAuthService: any
    let mockVoterService: any

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService)
    })

    describe('ngOnChanges', () => {

        it('should filter the sessions corretly', () => {
            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 2', level: 'begginer'},
                {name: 'session 3', level: 'intermediate'},
            ]
            component.filterBy = 'intermediate'
            component.sortBy = 'name'
            component.eventId = 3

            component.ngOnChanges()

            expect(component.visibleSessions!.length).toBe(2)
        })

        it('should sort the sessions corretly', () => {
            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 3', level: 'begginer'},
                {name: 'session 2', level: 'intermediate'},
            ]
            component.filterBy = 'all'
            component.sortBy = 'name'
            component.eventId = 3

            component.ngOnChanges()

            expect(component.visibleSessions![2].name).toBe('session 3')
        })
    })
})