/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ResultadoMetereologiaDetailComponent } from 'app/entities/monitoreo/resultado-metereologia/resultado-metereologia-detail.component';
import { ResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';

describe('Component Tests', () => {
  describe('ResultadoMetereologia Management Detail Component', () => {
    let comp: ResultadoMetereologiaDetailComponent;
    let fixture: ComponentFixture<ResultadoMetereologiaDetailComponent>;
    const route = ({ data: of({ resultadoMetereologia: new ResultadoMetereologia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ResultadoMetereologiaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ResultadoMetereologiaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ResultadoMetereologiaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.resultadoMetereologia).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
