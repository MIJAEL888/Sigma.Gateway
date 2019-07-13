/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ResultadoMetereologiaComponent } from 'app/entities/monitoreo/resultado-metereologia/resultado-metereologia.component';
import { ResultadoMetereologiaService } from 'app/entities/monitoreo/resultado-metereologia/resultado-metereologia.service';
import { ResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';

describe('Component Tests', () => {
  describe('ResultadoMetereologia Management Component', () => {
    let comp: ResultadoMetereologiaComponent;
    let fixture: ComponentFixture<ResultadoMetereologiaComponent>;
    let service: ResultadoMetereologiaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ResultadoMetereologiaComponent],
        providers: []
      })
        .overrideTemplate(ResultadoMetereologiaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResultadoMetereologiaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResultadoMetereologiaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ResultadoMetereologia(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.resultadoMetereologias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
