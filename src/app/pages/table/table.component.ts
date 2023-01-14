import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';

const fileColumns = [
    'id',
    'label',
    'number1',
    'number2',
    'inStock',
    'sold',
    'number3',
    'number4',
    'brand',
    'number5',
    'number6',
    'number7',
    'un',
    'description',
    'status',
    'createdAt',
    'number8',
    'number9',
];

interface Product {
    [key: string]: string;
    id: string;
    label: string;
    number1: string;
    number2: string;
    inStock: string;
    sold: string;
    number3: string;
    number4: string;
    brand: string;
    number5: string;
    number6: string;
    number7: string;
    un: string;
    description: string;
    status: string;
    createdAt: string;
    number8: string;
    number9: string;
}

interface Row {
    [key: string]: unknown;
}

interface Column {
    label: string;
    key: string;
    visible: boolean;
    render?: (value: unknown) => string | undefined;
}

const csvToJs = (csv: string, separator = ','): unknown[] => {
    const rows = csv.split('\n');

    const regex = new RegExp(`(?<=(^|[${separator}\\n]))"(|[\\s\\S]+?(?<![^"]"))"(?=($|[${separator}\\n]))`, 'g');

    const data = rows.reduce((rows: unknown[], row: string) => {
        const columns = row
            .replace(regex, (match, p1, p2) => {
                return p2;
            })
            .split(separator);
        const obj: Row = {};

        columns.forEach((column, index) => {
            obj[fileColumns[index]] = column.trim();
        });

        if (Object.keys(obj).length && obj['id']) {
            rows.push(obj);
        }

        return rows;
    }, []);

    return data;
};

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
    private draggedColumnIndex!: number;

    public dataColumns: Column[] = [
        { label: 'ID', key: 'id', visible: true },
        { label: 'Label', key: 'label', visible: true },
        { label: 'Number 1', key: 'number1', visible: false },
        { label: 'Number 2', key: 'number2', visible: false },
        { label: 'In Stock', key: 'inStock', visible: true },
        { label: 'Sold', key: 'sold', visible: true },
        { label: 'Number 3', key: 'number3', visible: false },
        { label: 'Number 4', key: 'number4', visible: false },
        { label: 'Brand', key: 'brand', visible: true },
        { label: 'Number 5', key: 'number5', visible: false },
        { label: 'Number 6', key: 'number6', visible: false },
        { label: 'Number 7', key: 'number7', visible: false },
        { label: 'UN', key: 'un', visible: true },
        { label: 'Description', key: 'description', visible: true },
        { label: 'Status', key: 'status', visible: true },
        {
            label: 'Created At',
            key: 'createdAt',
            visible: true,
            render: (value) => {
                const dateString = value as string;

                if (!dateString) {
                    return;
                }

                const date = `${dateString.slice(0, 4)}/${dateString.slice(4, 6)}/${dateString.slice(6, 8)}`;
                return new Date(date).toLocaleDateString();
            },
        },
        { label: 'Number 8', key: 'number8', visible: false },
        { label: 'Number 9', key: 'number9', visible: false },
    ];

    public tableHeader: Column[] = [];
    public dataSource = new MatTableDataSource<Product>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private http: HttpClient) { }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        this.tableHeader = this.dataColumns.filter((column) => column.visible);

        this.http
            .get('assets/files/produtos.csv', { responseType: 'text' })
            .subscribe((csv) => {
                this.dataSource.data = csvToJs(csv, ';') as Product[];
            });
    }

    dragStartColumn(index: number) {
        this.draggedColumnIndex = index;
    }

    allowDrop(event: DragEvent) {
        event.preventDefault();
    }

    dropColumn(index: number) {
        moveItemInArray(this.tableHeader, this.draggedColumnIndex, index);
    }

    dragEnterColumn(event: DragEvent, index: number) {
        const target = event.target as HTMLElement;

        target.classList.add('drag-enter');

        if (index <= this.draggedColumnIndex) {
            target.classList.add('drag-over-left');
        }

        if (index > this.draggedColumnIndex) {
            target.classList.add('drag-over-right');
        }
    }

    dragLeaveColumn(event: DragEvent) {
        const target = event.target as HTMLElement;

        target.classList.remove('drag-enter');
        target.classList.remove('drag-over-left');
        target.classList.remove('drag-over-right');
    }

    dragEndColumn(event: DragEvent) {
        const target = event.target as HTMLElement;

        target.classList.remove('drag-enter');
        target.classList.remove('drag-over-left');
        target.classList.remove('drag-over-right');
    }

    exportToExcel() {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Produtos');
        XLSX.writeFile(workbook, 'Produtos.xlsx', { compression: true });
    }

    handleFilterChange(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    get displayedColumns(): string[] {
        return this.tableHeader.map((column) => column.key);
    }

    set displayedColumns(columns: string[]) {
        this.tableHeader = this.dataColumns.filter((column) => columns.includes(column.key));
    }

    get filterString(): string {
        return this.dataSource.filter;
    }
}
