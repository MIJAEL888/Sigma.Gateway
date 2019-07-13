/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { EquipoDetailComponent } from 'app/entities/logistica/equipo/equipo-detail.component';
import { Equipo } from 'app/shared/model/logistica/equipo.model';

describe('Component Tests', () => {
  describe('Equipo Management Detail Component', () => {
    let comp: EquipoDetailComponent;
    let fixture: ComponentFixture<EquipoDetailComponent>;
    const route = ({ data: of({ equipo: new Equipo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EquipoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EquipoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EquipoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.equipo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
