/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TipoEquipoDetailComponent } from 'app/entities/logistica/tipo-equipo/tipo-equipo-detail.component';
import { TipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';

describe('Component Tests', () => {
  describe('TipoEquipo Management Detail Component', () => {
    let comp: TipoEquipoDetailComponent;
    let fixture: ComponentFixture<TipoEquipoDetailComponent>;
    const route = ({ data: of({ tipoEquipo: new TipoEquipo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoEquipoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoEquipoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoEquipoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoEquipo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
