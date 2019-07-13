/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PosicionDetailComponent } from 'app/entities/rrhh/posicion/posicion-detail.component';
import { Posicion } from 'app/shared/model/rrhh/posicion.model';

describe('Component Tests', () => {
  describe('Posicion Management Detail Component', () => {
    let comp: PosicionDetailComponent;
    let fixture: ComponentFixture<PosicionDetailComponent>;
    const route = ({ data: of({ posicion: new Posicion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PosicionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PosicionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PosicionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.posicion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
