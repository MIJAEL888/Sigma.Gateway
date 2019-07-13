/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MonitoreoServicioDetailComponent } from 'app/entities/comercial/monitoreo-servicio/monitoreo-servicio-detail.component';
import { MonitoreoServicio } from 'app/shared/model/comercial/monitoreo-servicio.model';

describe('Component Tests', () => {
  describe('MonitoreoServicio Management Detail Component', () => {
    let comp: MonitoreoServicioDetailComponent;
    let fixture: ComponentFixture<MonitoreoServicioDetailComponent>;
    const route = ({ data: of({ monitoreoServicio: new MonitoreoServicio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MonitoreoServicioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MonitoreoServicioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MonitoreoServicioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.monitoreoServicio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
