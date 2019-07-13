/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { FotografiaMonitoreoDetailComponent } from 'app/entities/monitoreo/fotografia-monitoreo/fotografia-monitoreo-detail.component';
import { FotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';

describe('Component Tests', () => {
  describe('FotografiaMonitoreo Management Detail Component', () => {
    let comp: FotografiaMonitoreoDetailComponent;
    let fixture: ComponentFixture<FotografiaMonitoreoDetailComponent>;
    const route = ({ data: of({ fotografiaMonitoreo: new FotografiaMonitoreo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [FotografiaMonitoreoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FotografiaMonitoreoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FotografiaMonitoreoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fotografiaMonitoreo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
