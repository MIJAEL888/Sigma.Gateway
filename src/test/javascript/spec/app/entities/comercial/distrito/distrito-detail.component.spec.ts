/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DistritoDetailComponent } from 'app/entities/comercial/distrito/distrito-detail.component';
import { Distrito } from 'app/shared/model/comercial/distrito.model';

describe('Component Tests', () => {
  describe('Distrito Management Detail Component', () => {
    let comp: DistritoDetailComponent;
    let fixture: ComponentFixture<DistritoDetailComponent>;
    const route = ({ data: of({ distrito: new Distrito(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DistritoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DistritoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DistritoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.distrito).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
