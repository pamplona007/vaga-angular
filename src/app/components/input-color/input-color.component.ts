import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-input-color',
    templateUrl: './input-color.component.html',
    styleUrls: ['./input-color.component.scss'],
})
export class InputColorComponent {
    @Input() public label!: string;
    @Input() public model!: unknown;
    @Input() public name!: string;
    @Output() public change: EventEmitter<Event> = new EventEmitter<Event>();

    public changeHandler(event: Event): void {
        this.change.emit(event);
    }
}
