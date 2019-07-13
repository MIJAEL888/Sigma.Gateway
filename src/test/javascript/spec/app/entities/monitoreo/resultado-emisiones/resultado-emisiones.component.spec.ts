/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ResultadoEmisionesComponent } from 'app/entities/monitoreo/resultado-emisiones/resultado-emisiones.component';
import { ResultadoEmisionesService } from 'app/entities/monitoreo/resultado-emisiones/resultado-emisiones.service';
import { ResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';

describe('Component Tests', () => {
  describe('ResultadoEmisiones Management Component', () => {
    let comp: ResultadoEmisionesComponent;
    let fixture: ComponentFixture<ResultadoEmisionesComponent>;
    let service: ResultadoEmisionesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ResultadoEmisionesComponent],
        providers: []
      })
        .overrideTemplate(ResultadoEmisionesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResultadoEmisionesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResultadoEmisionesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ResultadoEmisiones(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.resultadoEmisiones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
