import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

const fallbackRoute: Route = { path: '**', component: HomeComponent };
const routes: Routes = [
  { path: 'org/:id', component: CitiesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'createNewEvent/:id', component: CreateEventComponent },
  { path: 'createNewEvent', component: CreateEventComponent },
  { path: '', component: HomeComponent },
  fallbackRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
