/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RequisitosSeguridadUpdateComponent } from 'app/entities/comercial/requisitos-seguridad/requisitos-seguridad-update.component';
import { RequisitosSeguridadService } from 'app/entities/comercial/requisitos-seguridad/requisitos-seguridad.service';
import { RequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';

describe('Component Tests', () => {
  describe('RequisitosSeguridad Management Update Component', () => {
    let comp: RequisitosSeguridadUpdateComponent;
    let fixture: ComponentFixture<RequisitosSeguridadUpdateComponent>;
    let service: RequisitosSeguridadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RequisitosSeguridadUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RequisitosSeguridadUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RequisitosSeguridadUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequisitosSeguridadService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RequisitosSeguridad(123);
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
        const entity = new RequisitosSeguridad();
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
