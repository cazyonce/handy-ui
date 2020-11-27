import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIMappingEntity } from "../../shared/entity/api-mapping.entity";
import { HttpService } from 'src/app/core/service/http.service';
import { ConsoleHttpEmergencyService } from '../service/console-http-emergency.service';


@Injectable()
export class APIMappingHttp {

    constructor(private httpService: HttpService, private emergency: ConsoleHttpEmergencyService) { }

    list(): Observable<APIMappingEntity> {
        return this.httpService.get(this.emergency, "/sys_api/mapping");
    }

}