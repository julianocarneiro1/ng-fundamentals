import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CollapsibleWellComponent } from "src/app/common"
import { AuthService } from "src/app/user/auth.service"
import { SessionListComponent, UpVoteComponent, VoterService } from "."
import { DurationPipe } from ".."

describe('SessionListComponent', () => {

    let mockAuthService: any,
        mockVoterService: any,
        fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement

    beforeEach(() => {
        mockAuthService = { isAuthenticated: () => true, currentUser: {userName: 'Joe'} }
        mockVoterService = { userHasVoted: () => true }
        TestBed.configureTestingModule({
            declarations: [
                SessionListComponent,
                DurationPipe,
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService }
            ],
            schemas: [
                NO_ERRORS_SCHEMA //ignore template errors and children components from a template
            ]
        })
        fixture = TestBed.createComponent(SessionListComponent)
        component = fixture.componentInstance
        debugEl = fixture.debugElement
        element = fixture.nativeElement
    })
    
    describe('initial display', () => {

        it('should have the correct name', () => {
            component.sessions = [
                {name: 'Session 1', id: 3, presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract',
                voters: ['john', 'bob']}
            ]
            component.filterBy = 'all'
            component.sortBy = 'name'
            component.eventId = 4
            component.ngOnChanges()

            fixture.detectChanges()

            expect(element.querySelector('[well-title]')?.textContent).toContain('Session 1')
        })
    })
})