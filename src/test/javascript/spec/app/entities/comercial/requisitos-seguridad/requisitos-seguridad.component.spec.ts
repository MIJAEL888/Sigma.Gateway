/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { RequisitosSeguridadComponent } from 'app/entities/comercial/requisitos-seguridad/requisitos-seguridad.component';
import { RequisitosSeguridadService } from 'app/entities/comercial/requisitos-seguridad/requisitos-seguridad.service';
import { RequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';

describe('Component Tests', () => {
  describe('RequisitosSeguridad Management Component', () => {
    let comp: RequisitosSeguridadComponent;
    let fixture: ComponentFixture<RequisitosSeguridadComponent>;
    let service: RequisitosSeguridadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RequisitosSeguridadComponent],
        providers: []
      })
        .overrideTemplate(RequisitosSeguridadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RequisitosSeguridadComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequisitosSeguridadService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RequisitosSeguridad(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.requisitosSeguridads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
