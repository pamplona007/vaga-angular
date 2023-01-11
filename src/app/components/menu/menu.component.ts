import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    isMenuOpen = false;

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
