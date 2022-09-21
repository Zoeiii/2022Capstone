import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';

const fallbackRoute: Route = { path: '**', component: HomeComponent };
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'events', component: EventsComponent },
  { path: '', component: HomeComponent },
  fallbackRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}