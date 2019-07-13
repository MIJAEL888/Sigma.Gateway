/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { EquipoMonitoreoComponent } from 'app/entities/monitoreo/equipo-monitoreo/equipo-monitoreo.component';
import { EquipoMonitoreoService } from 'app/entities/monitoreo/equipo-monitoreo/equipo-monitoreo.service';
import { EquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';

describe('Component Tests', () => {
  describe('EquipoMonitoreo Management Component', () => {
    let comp: EquipoMonitoreoComponent;
    let fixture: ComponentFixture<EquipoMonitoreoComponent>;
    let service: EquipoMonitoreoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EquipoMonitoreoComponent],
        providers: []
      })
        .overrideTemplate(EquipoMonitoreoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EquipoMonitoreoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EquipoMonitoreoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EquipoMonitoreo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.equipoMonitoreos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
