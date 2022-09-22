import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  router!: Router;
  routerLink!: string;

  constructor(private _router:Router) {
    this.router = _router;
  }

  ngOnInit(): void {
  }

}
