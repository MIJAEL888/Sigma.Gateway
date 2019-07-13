/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TipoInduccionUpdateComponent } from 'app/entities/comercial/tipo-induccion/tipo-induccion-update.component';
import { TipoInduccionService } from 'app/entities/comercial/tipo-induccion/tipo-induccion.service';
import { TipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';

describe('Component Tests', () => {
  describe('TipoInduccion Management Update Component', () => {
    let comp: TipoInduccionUpdateComponent;
    let fixture: ComponentFixture<TipoInduccionUpdateComponent>;
    let service: TipoInduccionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoInduccionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoInduccionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoInduccionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoInduccionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoInduccion(123);
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
        const entity = new TipoInduccion();
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
