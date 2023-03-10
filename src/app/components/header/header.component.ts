import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public isMenuOpen = false;

    constructor(private ui: UiService) {}

    ngOnInit(): void {
        this.ui.onToggleMenu().subscribe((value) => {
            this.isMenuOpen = value;
        });
    }

    toggleMenu(): void {
        this.ui.toggleMenu();
    }
}
