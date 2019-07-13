/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ContactoSedeDetailComponent } from 'app/entities/comercial/contacto-sede/contacto-sede-detail.component';
import { ContactoSede } from 'app/shared/model/comercial/contacto-sede.model';

describe('Component Tests', () => {
  describe('ContactoSede Management Detail Component', () => {
    let comp: ContactoSedeDetailComponent;
    let fixture: ComponentFixture<ContactoSedeDetailComponent>;
    const route = ({ data: of({ contactoSede: new ContactoSede(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ContactoSedeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContactoSedeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactoSedeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contactoSede).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
