/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PuntoMonitoreoDetailComponent } from 'app/entities/monitoreo/punto-monitoreo/punto-monitoreo-detail.component';
import { PuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';

describe('Component Tests', () => {
  describe('PuntoMonitoreo Management Detail Component', () => {
    let comp: PuntoMonitoreoDetailComponent;
    let fixture: ComponentFixture<PuntoMonitoreoDetailComponent>;
    const route = ({ data: of({ puntoMonitoreo: new PuntoMonitoreo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PuntoMonitoreoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PuntoMonitoreoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PuntoMonitoreoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.puntoMonitoreo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
