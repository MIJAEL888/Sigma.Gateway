/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TipoInduccionDetailComponent } from 'app/entities/comercial/tipo-induccion/tipo-induccion-detail.component';
import { TipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';

describe('Component Tests', () => {
  describe('TipoInduccion Management Detail Component', () => {
    let comp: TipoInduccionDetailComponent;
    let fixture: ComponentFixture<TipoInduccionDetailComponent>;
    const route = ({ data: of({ tipoInduccion: new TipoInduccion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoInduccionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoInduccionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoInduccionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoInduccion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
