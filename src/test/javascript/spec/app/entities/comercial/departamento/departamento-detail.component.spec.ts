/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DepartamentoDetailComponent } from 'app/entities/comercial/departamento/departamento-detail.component';
import { Departamento } from 'app/shared/model/comercial/departamento.model';

describe('Component Tests', () => {
  describe('Departamento Management Detail Component', () => {
    let comp: DepartamentoDetailComponent;
    let fixture: ComponentFixture<DepartamentoDetailComponent>;
    const route = ({ data: of({ departamento: new Departamento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DepartamentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DepartamentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartamentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.departamento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
