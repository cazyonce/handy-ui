import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMappingAddComponent } from './api-mapping-add.component';

describe('ApiMappingAddComponent', () => {
  let component: ApiMappingAddComponent;
  let fixture: ComponentFixture<ApiMappingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiMappingAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMappingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
