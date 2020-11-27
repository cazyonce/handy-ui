import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { APIMappingEntity } from '../../../shared/entity/api-mapping.entity';
import { APIMappingService } from '../../../core/service/api-mapping.service';


@Injectable()
export class APIMappingListResolve implements Resolve<APIMappingEntity> {

    constructor(private service: APIMappingService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<APIMappingEntity> | Observable<never> {
        return this.service.list();
    }
}