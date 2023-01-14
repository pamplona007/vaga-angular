import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Image } from 'src/app/types';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
    public groupAImages: Image[] = [];
    public groupBImages: Image[] = [];

    public groupABorderColor!: string;
    public groupBBorderColor!: string;

    public groupBBackgroundColor!: string;
    public groupABackgroundColor!: string;

    public currentlySelectedGroup!: string;
    public addIcon: IconDefinition = faPlus;

    @ViewChild('imageUpload') imageUpload!: ElementRef;

    ngOnInit(): void {
        this.groupABorderColor = localStorage.getItem('groupABorderColor') || '#000000';
        this.groupBBorderColor = localStorage.getItem('groupBBorderColor') || '#000000';

        this.groupABackgroundColor = localStorage.getItem('groupABackgroundColor') || '#ffffff';
        this.groupBBackgroundColor = localStorage.getItem('groupBBackgroundColor') || '#ffffff';

        this.groupAImages = JSON.parse(localStorage.getItem('groupAImages') || '[]');
        this.groupBImages = JSON.parse(localStorage.getItem('groupBImages') || '[]');
    }

    optionChangeHandler(event: Event, option: 'groupABorderColor' | 'groupBBorderColor' | 'groupBBackgroundColor' | 'groupABackgroundColor'): void {
        const target = event.target as HTMLInputElement;
        const value = target.value;

        this[option] = value;
        localStorage.setItem(option, value);
    }

    addImage(group: string): void {
        this.currentlySelectedGroup = group;

        if ('A' === group && 5 <= this.groupAImages.length) {
            return;
        }

        if ('B' === group && 5 <= this.groupBImages.length) {
            return;
        }

        this.imageUpload.nativeElement.click();
    }

    removeImage(image: Image, group: string): void {
        if ('A' === group) {
            this.groupAImages = this.groupAImages.filter((item) => item.id !== image.id);
            localStorage.setItem('groupAImages', JSON.stringify(this.groupAImages));
            return;
        }

        this.groupBImages = this.groupBImages.filter((item) => item.id !== image.id);
        localStorage.setItem('groupBImages', JSON.stringify(this.groupBImages));
    }

    fileInputChangeHandler(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files?.[0];
        const reader = new FileReader();

        reader.readAsDataURL(file as Blob);
        reader.onload = () => {
            const image = {
                id: Date.now(),
                url: reader.result,
                name: file?.name || '',
            };

            if ('A' === this.currentlySelectedGroup) {
                this.groupAImages.push(image);
                localStorage.setItem('groupAImages', JSON.stringify(this.groupAImages));
                return;
            }

            this.groupBImages.push(image);
            localStorage.setItem('groupBImages', JSON.stringify(this.groupBImages));
        };
    }

    dropHandler(event: CdkDragDrop<Image[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            return;
        }

        if (5 <= event.container.data.length) {
            return;
        }

        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
    }
}
