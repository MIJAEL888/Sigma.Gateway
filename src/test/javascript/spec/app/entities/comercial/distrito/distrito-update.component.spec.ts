/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DistritoUpdateComponent } from 'app/entities/comercial/distrito/distrito-update.component';
import { DistritoService } from 'app/entities/comercial/distrito/distrito.service';
import { Distrito } from 'app/shared/model/comercial/distrito.model';

describe('Component Tests', () => {
  describe('Distrito Management Update Component', () => {
    let comp: DistritoUpdateComponent;
    let fixture: ComponentFixture<DistritoUpdateComponent>;
    let service: DistritoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DistritoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DistritoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DistritoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DistritoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Distrito(123);
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
        const entity = new Distrito();
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
