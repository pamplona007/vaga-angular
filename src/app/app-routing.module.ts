import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './pages/image/image.component';
import { PanelComponent } from './pages/panel/panel.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
    {
        path: '',
        component: TableComponent,
        title: 'Table',
    },
    {
        path: 'image',
        component: ImageComponent,
        title: 'Image',
    },
    {
        path: 'panel',
        component: PanelComponent,
        title: 'Panel',
    },
    {
        path: '**',
        redirectTo: '/table',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
