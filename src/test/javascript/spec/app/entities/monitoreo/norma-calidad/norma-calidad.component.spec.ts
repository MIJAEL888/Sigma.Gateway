/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { NormaCalidadComponent } from 'app/entities/monitoreo/norma-calidad/norma-calidad.component';
import { NormaCalidadService } from 'app/entities/monitoreo/norma-calidad/norma-calidad.service';
import { NormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';

describe('Component Tests', () => {
  describe('NormaCalidad Management Component', () => {
    let comp: NormaCalidadComponent;
    let fixture: ComponentFixture<NormaCalidadComponent>;
    let service: NormaCalidadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NormaCalidadComponent],
        providers: []
      })
        .overrideTemplate(NormaCalidadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NormaCalidadComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NormaCalidadService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NormaCalidad(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.normaCalidads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
