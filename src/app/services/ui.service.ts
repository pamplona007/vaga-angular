import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiService {
    private showMenu = false;
    private subject = new Subject<boolean>();

    toggleMenu(): void {
        this.showMenu = !this.showMenu;
        this.subject.next(this.showMenu);
    }

    onToggleMenu(): Observable<boolean> {
        return this.subject.asObservable();
    }
}
