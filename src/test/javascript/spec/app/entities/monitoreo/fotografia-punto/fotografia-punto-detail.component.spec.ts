/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { FotografiaPuntoDetailComponent } from 'app/entities/monitoreo/fotografia-punto/fotografia-punto-detail.component';
import { FotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';

describe('Component Tests', () => {
  describe('FotografiaPunto Management Detail Component', () => {
    let comp: FotografiaPuntoDetailComponent;
    let fixture: ComponentFixture<FotografiaPuntoDetailComponent>;
    const route = ({ data: of({ fotografiaPunto: new FotografiaPunto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [FotografiaPuntoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FotografiaPuntoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FotografiaPuntoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fotografiaPunto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
