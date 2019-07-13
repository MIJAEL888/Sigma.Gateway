/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { TipoServiciosComponent } from 'app/entities/comercial/tipo-servicios/tipo-servicios.component';
import { TipoServiciosService } from 'app/entities/comercial/tipo-servicios/tipo-servicios.service';
import { TipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';

describe('Component Tests', () => {
  describe('TipoServicios Management Component', () => {
    let comp: TipoServiciosComponent;
    let fixture: ComponentFixture<TipoServiciosComponent>;
    let service: TipoServiciosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoServiciosComponent],
        providers: []
      })
        .overrideTemplate(TipoServiciosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoServiciosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoServiciosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoServicios(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoServicios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
