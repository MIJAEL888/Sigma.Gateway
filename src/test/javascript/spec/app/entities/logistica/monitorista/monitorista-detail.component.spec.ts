/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MonitoristaDetailComponent } from 'app/entities/logistica/monitorista/monitorista-detail.component';
import { Monitorista } from 'app/shared/model/logistica/monitorista.model';

describe('Component Tests', () => {
  describe('Monitorista Management Detail Component', () => {
    let comp: MonitoristaDetailComponent;
    let fixture: ComponentFixture<MonitoristaDetailComponent>;
    const route = ({ data: of({ monitorista: new Monitorista(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MonitoristaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MonitoristaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MonitoristaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.monitorista).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
