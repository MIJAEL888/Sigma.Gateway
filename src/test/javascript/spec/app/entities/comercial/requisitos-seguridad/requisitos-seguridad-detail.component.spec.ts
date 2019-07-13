/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RequisitosSeguridadDetailComponent } from 'app/entities/comercial/requisitos-seguridad/requisitos-seguridad-detail.component';
import { RequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';

describe('Component Tests', () => {
  describe('RequisitosSeguridad Management Detail Component', () => {
    let comp: RequisitosSeguridadDetailComponent;
    let fixture: ComponentFixture<RequisitosSeguridadDetailComponent>;
    const route = ({ data: of({ requisitosSeguridad: new RequisitosSeguridad(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RequisitosSeguridadDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RequisitosSeguridadDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RequisitosSeguridadDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.requisitosSeguridad).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
