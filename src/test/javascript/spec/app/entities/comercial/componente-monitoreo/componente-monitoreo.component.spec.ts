/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ComponenteMonitoreoComponent } from 'app/entities/comercial/componente-monitoreo/componente-monitoreo.component';
import { ComponenteMonitoreoService } from 'app/entities/comercial/componente-monitoreo/componente-monitoreo.service';
import { ComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';

describe('Component Tests', () => {
  describe('ComponenteMonitoreo Management Component', () => {
    let comp: ComponenteMonitoreoComponent;
    let fixture: ComponentFixture<ComponenteMonitoreoComponent>;
    let service: ComponenteMonitoreoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ComponenteMonitoreoComponent],
        providers: []
      })
        .overrideTemplate(ComponenteMonitoreoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ComponenteMonitoreoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ComponenteMonitoreoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ComponenteMonitoreo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.componenteMonitoreos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
