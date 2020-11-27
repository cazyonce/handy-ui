import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIMappingEntity } from 'src/app/domain/console/shared/entity/api-mapping.entity';

@Component({
  selector: 'app-api-mapping',
  templateUrl: './api-mapping.component.html',
  styleUrls: ['./api-mapping.component.css']
})
export class ApiMappingComponent implements OnInit {
  
  apiMappings:Array<APIMappingEntity>;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { paging: Array<APIMappingEntity> }) => {
      // console.log(data.paging)
      // for (const iterator of data.paging) {
      //   console.log(iterator)
      // }
      this.apiMappings = data.paging;
    });
  }

}
