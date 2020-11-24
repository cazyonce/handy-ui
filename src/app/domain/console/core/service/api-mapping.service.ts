import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIMappingHttp } from '../http/api-mapping.http';

@Injectable()
export class APIMappingService {

    constructor(private http: APIMappingHttp) { }

    list(): Observable<any> {
        return this.http.list();
    }
}