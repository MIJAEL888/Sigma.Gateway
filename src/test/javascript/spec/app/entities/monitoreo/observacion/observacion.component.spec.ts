/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ObservacionComponent } from 'app/entities/monitoreo/observacion/observacion.component';
import { ObservacionService } from 'app/entities/monitoreo/observacion/observacion.service';
import { Observacion } from 'app/shared/model/monitoreo/observacion.model';

describe('Component Tests', () => {
  describe('Observacion Management Component', () => {
    let comp: ObservacionComponent;
    let fixture: ComponentFixture<ObservacionComponent>;
    let service: ObservacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ObservacionComponent],
        providers: []
      })
        .overrideTemplate(ObservacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ObservacionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ObservacionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Observacion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.observacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
