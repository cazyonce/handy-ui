import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMappingComponent } from './api-mapping.component';

describe('ApiMappingComponent', () => {
  let component: ApiMappingComponent;
  let fixture: ComponentFixture<ApiMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
