import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-page-layout',
    templateUrl: './page-layout.component.html',
    styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent {
    @Input() pageTitle!: string;
}
