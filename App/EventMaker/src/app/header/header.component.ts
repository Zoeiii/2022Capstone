import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        //command is the onClick
        command: () => {
          console.log('click and route to home')
          this.router.navigate(['home']);
        },
      }
    ];
  }
}
