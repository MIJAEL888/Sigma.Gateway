/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ParamentroMonitoreoDetailComponent } from 'app/entities/comercial/paramentro-monitoreo/paramentro-monitoreo-detail.component';
import { ParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';

describe('Component Tests', () => {
  describe('ParamentroMonitoreo Management Detail Component', () => {
    let comp: ParamentroMonitoreoDetailComponent;
    let fixture: ComponentFixture<ParamentroMonitoreoDetailComponent>;
    const route = ({ data: of({ paramentroMonitoreo: new ParamentroMonitoreo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ParamentroMonitoreoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ParamentroMonitoreoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamentroMonitoreoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paramentroMonitoreo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
