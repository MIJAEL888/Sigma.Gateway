/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PuntoMonitoreoObsDetailComponent } from 'app/entities/monitoreo/punto-monitoreo-obs/punto-monitoreo-obs-detail.component';
import { PuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';

describe('Component Tests', () => {
  describe('PuntoMonitoreoObs Management Detail Component', () => {
    let comp: PuntoMonitoreoObsDetailComponent;
    let fixture: ComponentFixture<PuntoMonitoreoObsDetailComponent>;
    const route = ({ data: of({ puntoMonitoreoObs: new PuntoMonitoreoObs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PuntoMonitoreoObsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PuntoMonitoreoObsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PuntoMonitoreoObsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.puntoMonitoreoObs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
