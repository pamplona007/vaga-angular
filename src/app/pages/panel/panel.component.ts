import { Component, OnInit } from '@angular/core';
import {
    trigger,
    style,
    animate,
    transition,
} from '@angular/animations';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    animations: [
        trigger('valueAnimation', [
            transition(':increment', [
                style({
                    color: 'green',
                    opacity: 1,
                    transform: 'translateY(10px)',
                }),
                animate('0.5s ease-out', style('*')),
            ]),
            transition(':decrement', [
                style({
                    color: 'red',
                    opacity: 1,
                    transform: 'translateY(-10px)',
                }),
                animate('0.5s ease-out', style('*')),
            ]),
        ]),
    ],
})
export class PanelComponent implements OnInit {
    interval!: ReturnType<typeof setInterval>;

    styles = [
        {
            'color': '#f44336',
            'font-weight': 700,
        },
        {
            'color': '#e91e63',
            'font-weight': 400,
        },
        {
            'color': '#9c27b0',
            'font-weight': 200,
        },
        {
            'color': '#673ab7',
            'font-weight': 700,
        },
        {
            'color': '#3f51b5',
            'font-weight': 400,
        },
    ];

    initialNumber = (Math.random() * 1000000) + 1000000;
    previousNumbers: number[] = [];
    currentNumber = 0;
    currentStyle = this.styles[0];
    currentDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    offset!: number;

    treatNumber(number: number): string {
        const splitNumber = String(number)
            .split('.');

        if (splitNumber[1]) {
            splitNumber[1] = splitNumber[1].slice(0, 2);
            splitNumber[1] = splitNumber[1].padEnd(2, '0');
        }

        return splitNumber
            .join(',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    ngOnInit(): void {
        this.currentNumber = this.initialNumber;

        this.interval = setInterval(() => {
            const newNumber = this.currentNumber + ((Math.random() * 9000) + 999.99) + (this.offset || 0);
            const difference = this.currentNumber - this.initialNumber;
            const differenceModule = Math.floor(Math.abs(difference) / 50000);

            this.previousNumbers.unshift(this.currentNumber);
            this.previousNumbers = this.previousNumbers.slice(0, 10);
            this.currentNumber = newNumber;
            this.currentStyle = this.styles[differenceModule % this.styles.length];
            this.currentDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        }, 1000);
    }
}
