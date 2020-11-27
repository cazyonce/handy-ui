import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { PageService } from './core/service/page.service';
import { Route, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  //  <exception504 *ngIf="page.exception504()"></exception504>
  template: `
   
    <router-outlet *ngIf="!page.exception()"></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isInit = true;
  title = 'amass';

  constructor(public page: PageService, private router: Router,
    private renderer: Renderer2, private element: ElementRef<Element>
  ) {
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     // if (!this.isInit) {
    //     // }
    //   } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
    //     if (this.isInit) {
    //       this.isInit = false;
    //       document.getElementById("pageInitloader").className = "preloader-hidden";
    //     }
    //   }
    // })
  }

  ngOnInit() {
  }

}
