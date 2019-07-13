/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { NormaCalidadDetailComponent } from 'app/entities/monitoreo/norma-calidad/norma-calidad-detail.component';
import { NormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';

describe('Component Tests', () => {
  describe('NormaCalidad Management Detail Component', () => {
    let comp: NormaCalidadDetailComponent;
    let fixture: ComponentFixture<NormaCalidadDetailComponent>;
    const route = ({ data: of({ normaCalidad: new NormaCalidad(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NormaCalidadDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NormaCalidadDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NormaCalidadDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.normaCalidad).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
