/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PosicionComponent } from 'app/entities/rrhh/posicion/posicion.component';
import { PosicionService } from 'app/entities/rrhh/posicion/posicion.service';
import { Posicion } from 'app/shared/model/rrhh/posicion.model';

describe('Component Tests', () => {
  describe('Posicion Management Component', () => {
    let comp: PosicionComponent;
    let fixture: ComponentFixture<PosicionComponent>;
    let service: PosicionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PosicionComponent],
        providers: []
      })
        .overrideTemplate(PosicionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PosicionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PosicionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Posicion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.posicions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
