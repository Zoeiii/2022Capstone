import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Search for Events');
  }

  ngOnInit(): void {}
}
