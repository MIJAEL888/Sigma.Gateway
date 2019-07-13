/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ContactoSedeComponent } from 'app/entities/comercial/contacto-sede/contacto-sede.component';
import { ContactoSedeService } from 'app/entities/comercial/contacto-sede/contacto-sede.service';
import { ContactoSede } from 'app/shared/model/comercial/contacto-sede.model';

describe('Component Tests', () => {
  describe('ContactoSede Management Component', () => {
    let comp: ContactoSedeComponent;
    let fixture: ComponentFixture<ContactoSedeComponent>;
    let service: ContactoSedeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ContactoSedeComponent],
        providers: []
      })
        .overrideTemplate(ContactoSedeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactoSedeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactoSedeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ContactoSede(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contactoSedes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
