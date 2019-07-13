/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ParamentroDetailComponent } from 'app/entities/monitoreo/paramentro/paramentro-detail.component';
import { Paramentro } from 'app/shared/model/monitoreo/paramentro.model';

describe('Component Tests', () => {
  describe('Paramentro Management Detail Component', () => {
    let comp: ParamentroDetailComponent;
    let fixture: ComponentFixture<ParamentroDetailComponent>;
    const route = ({ data: of({ paramentro: new Paramentro(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ParamentroDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ParamentroDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamentroDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paramentro).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
