/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TipoServiciosDetailComponent } from 'app/entities/comercial/tipo-servicios/tipo-servicios-detail.component';
import { TipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';

describe('Component Tests', () => {
  describe('TipoServicios Management Detail Component', () => {
    let comp: TipoServiciosDetailComponent;
    let fixture: ComponentFixture<TipoServiciosDetailComponent>;
    const route = ({ data: of({ tipoServicios: new TipoServicios(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoServiciosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoServiciosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoServiciosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoServicios).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
