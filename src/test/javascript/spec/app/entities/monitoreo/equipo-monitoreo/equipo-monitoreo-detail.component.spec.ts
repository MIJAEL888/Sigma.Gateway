/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { EquipoMonitoreoDetailComponent } from 'app/entities/monitoreo/equipo-monitoreo/equipo-monitoreo-detail.component';
import { EquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';

describe('Component Tests', () => {
  describe('EquipoMonitoreo Management Detail Component', () => {
    let comp: EquipoMonitoreoDetailComponent;
    let fixture: ComponentFixture<EquipoMonitoreoDetailComponent>;
    const route = ({ data: of({ equipoMonitoreo: new EquipoMonitoreo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EquipoMonitoreoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EquipoMonitoreoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EquipoMonitoreoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.equipoMonitoreo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
