import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router, PRIMARY_OUTLET, NavigationEnd } from '@angular/router';

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    // 初始化组件渲染
    this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
    // 后续手动点击触发渲染
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
      }
    });
  }

  /**
   * Returns array of IBreadcrumb objects that represent the breadcrumb
   *
   * @class DetailComponent
   * @method getBreadcrumbs
   * @param {ActivateRoute} route
   * @param {string} url
   * @param {IBreadcrumb[]} breadcrumbs
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
  
      //append route URL to URL
      url += `/${routeURL}`;

      // 如果存在该属性但值为null，表明不需要添加到面包屑中
      if (child.snapshot.data[ROUTE_DATA_BREADCRUMB] == null) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
      //add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
