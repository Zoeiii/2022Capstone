import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchInput$: Subject<string> = new Subject<string>();
  constructor() { }
}
