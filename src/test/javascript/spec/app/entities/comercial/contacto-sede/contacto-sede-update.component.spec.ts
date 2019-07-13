/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ContactoSedeUpdateComponent } from 'app/entities/comercial/contacto-sede/contacto-sede-update.component';
import { ContactoSedeService } from 'app/entities/comercial/contacto-sede/contacto-sede.service';
import { ContactoSede } from 'app/shared/model/comercial/contacto-sede.model';

describe('Component Tests', () => {
  describe('ContactoSede Management Update Component', () => {
    let comp: ContactoSedeUpdateComponent;
    let fixture: ComponentFixture<ContactoSedeUpdateComponent>;
    let service: ContactoSedeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ContactoSedeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContactoSedeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactoSedeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactoSedeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContactoSede(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContactoSede();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
