/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { UnidadesComponent } from 'app/entities/monitoreo/unidades/unidades.component';
import { UnidadesService } from 'app/entities/monitoreo/unidades/unidades.service';
import { Unidades } from 'app/shared/model/monitoreo/unidades.model';

describe('Component Tests', () => {
  describe('Unidades Management Component', () => {
    let comp: UnidadesComponent;
    let fixture: ComponentFixture<UnidadesComponent>;
    let service: UnidadesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UnidadesComponent],
        providers: []
      })
        .overrideTemplate(UnidadesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnidadesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnidadesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Unidades(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.unidades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
