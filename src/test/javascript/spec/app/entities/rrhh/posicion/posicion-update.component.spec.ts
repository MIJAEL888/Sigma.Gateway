/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PosicionUpdateComponent } from 'app/entities/rrhh/posicion/posicion-update.component';
import { PosicionService } from 'app/entities/rrhh/posicion/posicion.service';
import { Posicion } from 'app/shared/model/rrhh/posicion.model';

describe('Component Tests', () => {
  describe('Posicion Management Update Component', () => {
    let comp: PosicionUpdateComponent;
    let fixture: ComponentFixture<PosicionUpdateComponent>;
    let service: PosicionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PosicionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PosicionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PosicionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PosicionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Posicion(123);
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
        const entity = new Posicion();
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
