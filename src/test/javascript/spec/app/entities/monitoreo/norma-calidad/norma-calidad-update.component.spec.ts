/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { NormaCalidadUpdateComponent } from 'app/entities/monitoreo/norma-calidad/norma-calidad-update.component';
import { NormaCalidadService } from 'app/entities/monitoreo/norma-calidad/norma-calidad.service';
import { NormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';

describe('Component Tests', () => {
  describe('NormaCalidad Management Update Component', () => {
    let comp: NormaCalidadUpdateComponent;
    let fixture: ComponentFixture<NormaCalidadUpdateComponent>;
    let service: NormaCalidadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NormaCalidadUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NormaCalidadUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NormaCalidadUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NormaCalidadService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NormaCalidad(123);
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
        const entity = new NormaCalidad();
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
