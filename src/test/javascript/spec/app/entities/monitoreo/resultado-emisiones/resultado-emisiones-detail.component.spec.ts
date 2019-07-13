/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ResultadoEmisionesDetailComponent } from 'app/entities/monitoreo/resultado-emisiones/resultado-emisiones-detail.component';
import { ResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';

describe('Component Tests', () => {
  describe('ResultadoEmisiones Management Detail Component', () => {
    let comp: ResultadoEmisionesDetailComponent;
    let fixture: ComponentFixture<ResultadoEmisionesDetailComponent>;
    const route = ({ data: of({ resultadoEmisiones: new ResultadoEmisiones(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ResultadoEmisionesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ResultadoEmisionesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ResultadoEmisionesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.resultadoEmisiones).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
