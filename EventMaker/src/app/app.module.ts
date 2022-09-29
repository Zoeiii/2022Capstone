import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { CitiesComponent } from './cities/cities.component';
import { MainComponent } from './main/main.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { RegisterAttendeeComponent } from './attendee/register-attendee/register-attendee.component';
import { AttendeeComponent } from './attendee/attendee.component';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { GalleriaModule } from 'primeng/galleria';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddRowDirective } from './shared/add-row.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    HomeComponent,
    EventsComponent,
    CitiesComponent,
    MainComponent,
    CreateEventComponent,
    RegisterAttendeeComponent,
    AttendeeComponent,
    AddRowDirective
  ],
  imports: [
    BreadcrumbModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    HttpClientModule,
    GalleriaModule,
    FormsModule,
    TableModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    MultiSelectModule,
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
