/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { FotografiaMonitoreoComponent } from 'app/entities/monitoreo/fotografia-monitoreo/fotografia-monitoreo.component';
import { FotografiaMonitoreoService } from 'app/entities/monitoreo/fotografia-monitoreo/fotografia-monitoreo.service';
import { FotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';

describe('Component Tests', () => {
  describe('FotografiaMonitoreo Management Component', () => {
    let comp: FotografiaMonitoreoComponent;
    let fixture: ComponentFixture<FotografiaMonitoreoComponent>;
    let service: FotografiaMonitoreoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [FotografiaMonitoreoComponent],
        providers: []
      })
        .overrideTemplate(FotografiaMonitoreoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FotografiaMonitoreoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FotografiaMonitoreoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FotografiaMonitoreo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fotografiaMonitoreos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
