/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AreaDetailComponent } from 'app/entities/rrhh/area/area-detail.component';
import { Area } from 'app/shared/model/rrhh/area.model';

describe('Component Tests', () => {
  describe('Area Management Detail Component', () => {
    let comp: AreaDetailComponent;
    let fixture: ComponentFixture<AreaDetailComponent>;
    const route = ({ data: of({ area: new Area(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AreaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AreaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AreaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.area).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
