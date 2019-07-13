/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { TipoSeguroComponent } from 'app/entities/logistica/tipo-seguro/tipo-seguro.component';
import { TipoSeguroService } from 'app/entities/logistica/tipo-seguro/tipo-seguro.service';
import { TipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';

describe('Component Tests', () => {
  describe('TipoSeguro Management Component', () => {
    let comp: TipoSeguroComponent;
    let fixture: ComponentFixture<TipoSeguroComponent>;
    let service: TipoSeguroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoSeguroComponent],
        providers: []
      })
        .overrideTemplate(TipoSeguroComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoSeguroComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoSeguroService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoSeguro(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoSeguros[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
