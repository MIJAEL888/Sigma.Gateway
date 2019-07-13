/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TipoSeguroDetailComponent } from 'app/entities/logistica/tipo-seguro/tipo-seguro-detail.component';
import { TipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';

describe('Component Tests', () => {
  describe('TipoSeguro Management Detail Component', () => {
    let comp: TipoSeguroDetailComponent;
    let fixture: ComponentFixture<TipoSeguroDetailComponent>;
    const route = ({ data: of({ tipoSeguro: new TipoSeguro(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoSeguroDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoSeguroDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoSeguroDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoSeguro).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
