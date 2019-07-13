/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { LaboratorioDetailComponent } from 'app/entities/logistica/laboratorio/laboratorio-detail.component';
import { Laboratorio } from 'app/shared/model/logistica/laboratorio.model';

describe('Component Tests', () => {
  describe('Laboratorio Management Detail Component', () => {
    let comp: LaboratorioDetailComponent;
    let fixture: ComponentFixture<LaboratorioDetailComponent>;
    const route = ({ data: of({ laboratorio: new Laboratorio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LaboratorioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LaboratorioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LaboratorioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.laboratorio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
