import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'src/app/types';

@Component({
    selector: 'app-image-card',
    templateUrl: './image-card.component.html',
    styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
    @Input() public image!: Image;
    @Output() public removeImage: EventEmitter<unknown> = new EventEmitter<unknown>();

    public rotation!: number;
    public deleteIcon = faXmark;

    ngOnInit(): void {
        this.rotation = Math.floor(Math.random() * 14) - 7;
    }

    removeImageHandler(): void {
        this.removeImage.emit();
    }
}
