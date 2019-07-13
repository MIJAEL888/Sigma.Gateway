/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TipoComponenteDetailComponent } from 'app/entities/monitoreo/tipo-componente/tipo-componente-detail.component';
import { TipoComponente } from 'app/shared/model/monitoreo/tipo-componente.model';

describe('Component Tests', () => {
  describe('TipoComponente Management Detail Component', () => {
    let comp: TipoComponenteDetailComponent;
    let fixture: ComponentFixture<TipoComponenteDetailComponent>;
    const route = ({ data: of({ tipoComponente: new TipoComponente(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoComponenteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoComponenteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoComponenteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoComponente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
