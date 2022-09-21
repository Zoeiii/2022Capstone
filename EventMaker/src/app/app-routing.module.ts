import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './header/search/search.component';

const fallbackRoute: Route = { path: '**', component: HomeComponent };
const routes: Routes = [
  { path: 'Cities', component: CitiesComponent },
  { path: 'Events', component: EventsComponent },
  { path: 'Search', component: SearchComponent },
  { path: '', component: HomeComponent },
  fallbackRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
