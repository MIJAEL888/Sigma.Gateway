/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { LaboratorioMonitoreoDetailComponent } from 'app/entities/monitoreo/laboratorio-monitoreo/laboratorio-monitoreo-detail.component';
import { LaboratorioMonitoreo } from 'app/shared/model/monitoreo/laboratorio-monitoreo.model';

describe('Component Tests', () => {
  describe('LaboratorioMonitoreo Management Detail Component', () => {
    let comp: LaboratorioMonitoreoDetailComponent;
    let fixture: ComponentFixture<LaboratorioMonitoreoDetailComponent>;
    const route = ({ data: of({ laboratorioMonitoreo: new LaboratorioMonitoreo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LaboratorioMonitoreoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LaboratorioMonitoreoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LaboratorioMonitoreoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.laboratorioMonitoreo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
