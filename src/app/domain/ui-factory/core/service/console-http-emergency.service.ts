import { HttpEmergencyService } from "src/app/core/service/http-emergency.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class ConsoleHttpEmergencyService extends HttpEmergencyService {


    constructor(private router: Router) {
        super();
    }

    public noLogin(): void {
        this.router.navigateByUrl("admin/signin");
    }

    public noPermission(): void {

    }
}