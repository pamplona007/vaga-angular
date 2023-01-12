import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { TableComponent } from './pages/table/table.component';
import { ImageComponent } from './pages/image/image.component';
import { PanelComponent } from './pages/panel/panel.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputColorComponent } from './components/input-color/input-color.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        TableComponent,
        ImageComponent,
        PanelComponent,
        PageLayoutComponent,
        ImageCardComponent,
        InputColorComponent,
        ButtonComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        DragDropModule,
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
