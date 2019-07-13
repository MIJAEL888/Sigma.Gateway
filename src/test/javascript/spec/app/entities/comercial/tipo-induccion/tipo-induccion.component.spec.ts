/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { TipoInduccionComponent } from 'app/entities/comercial/tipo-induccion/tipo-induccion.component';
import { TipoInduccionService } from 'app/entities/comercial/tipo-induccion/tipo-induccion.service';
import { TipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';

describe('Component Tests', () => {
  describe('TipoInduccion Management Component', () => {
    let comp: TipoInduccionComponent;
    let fixture: ComponentFixture<TipoInduccionComponent>;
    let service: TipoInduccionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoInduccionComponent],
        providers: []
      })
        .overrideTemplate(TipoInduccionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoInduccionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoInduccionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoInduccion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoInduccions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
