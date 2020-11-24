import { CanLoad, Route, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class SigninGuard implements CanLoad {

    constructor(private router: Router) { }

    canLoad(route: Route): boolean {
        console.log("SigninGuard================", route.path)
//         if (route.path == "user") {
//             if(this.systemService.userLogined()){
//                 return true;
//             }
//             //  this.systemService.getSystemInformation().then(aa=>{
//             //     console.log("qqqqqqqqqqqqqqqqqq")
//             //  });
//             //.userLogined();
//             // if (userLogined) {
//             //     return true;
//             // }
//             this.router.navigateByUrl("user/signin");
//         // } else if (route.path == "admin") {
//         //     if (adminLogined) {
//         //         return true;
//         //     }
//         //     this.router.navigateByUrl("admin/signin");
//         }
// console.log("wwwwwwwwwwwwwwwwww")
        return true;
    }
}