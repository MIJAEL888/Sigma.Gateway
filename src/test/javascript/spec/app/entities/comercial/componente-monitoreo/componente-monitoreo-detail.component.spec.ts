/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ComponenteMonitoreoDetailComponent } from 'app/entities/comercial/componente-monitoreo/componente-monitoreo-detail.component';
import { ComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';

describe('Component Tests', () => {
  describe('ComponenteMonitoreo Management Detail Component', () => {
    let comp: ComponenteMonitoreoDetailComponent;
    let fixture: ComponentFixture<ComponenteMonitoreoDetailComponent>;
    const route = ({ data: of({ componenteMonitoreo: new ComponenteMonitoreo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ComponenteMonitoreoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ComponenteMonitoreoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ComponenteMonitoreoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.componenteMonitoreo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
