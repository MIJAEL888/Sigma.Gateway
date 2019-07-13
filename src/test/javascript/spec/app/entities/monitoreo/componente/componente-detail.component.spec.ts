/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ComponenteDetailComponent } from 'app/entities/monitoreo/componente/componente-detail.component';
import { Componente } from 'app/shared/model/monitoreo/componente.model';

describe('Component Tests', () => {
  describe('Componente Management Detail Component', () => {
    let comp: ComponenteDetailComponent;
    let fixture: ComponentFixture<ComponenteDetailComponent>;
    const route = ({ data: of({ componente: new Componente(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ComponenteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ComponenteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ComponenteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.componente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
