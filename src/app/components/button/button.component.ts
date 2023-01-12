import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() type = 'button';
    @Input() disabled = false;

    @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

    public clickHandler(event: Event): void {
        this.click.emit(event);
    }
}
