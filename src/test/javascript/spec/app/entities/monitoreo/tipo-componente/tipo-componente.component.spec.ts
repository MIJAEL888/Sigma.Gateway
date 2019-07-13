/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { TipoComponenteComponent } from 'app/entities/monitoreo/tipo-componente/tipo-componente.component';
import { TipoComponenteService } from 'app/entities/monitoreo/tipo-componente/tipo-componente.service';
import { TipoComponente } from 'app/shared/model/monitoreo/tipo-componente.model';

describe('Component Tests', () => {
  describe('TipoComponente Management Component', () => {
    let comp: TipoComponenteComponent;
    let fixture: ComponentFixture<TipoComponenteComponent>;
    let service: TipoComponenteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoComponenteComponent],
        providers: []
      })
        .overrideTemplate(TipoComponenteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoComponenteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoComponenteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoComponente(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoComponentes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
