import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() searchInput!:string;

  constructor(private titleService: Title) {
    this.titleService.setTitle('Search for Events');
  }

  ngOnInit(): void {
    console.log(this.searchInput);
  }
}
