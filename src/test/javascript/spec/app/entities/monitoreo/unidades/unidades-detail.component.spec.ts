/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { UnidadesDetailComponent } from 'app/entities/monitoreo/unidades/unidades-detail.component';
import { Unidades } from 'app/shared/model/monitoreo/unidades.model';

describe('Component Tests', () => {
  describe('Unidades Management Detail Component', () => {
    let comp: UnidadesDetailComponent;
    let fixture: ComponentFixture<UnidadesDetailComponent>;
    const route = ({ data: of({ unidades: new Unidades(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UnidadesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UnidadesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnidadesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.unidades).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
