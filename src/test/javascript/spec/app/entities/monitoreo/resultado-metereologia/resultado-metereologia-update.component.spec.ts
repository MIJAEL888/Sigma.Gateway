/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ResultadoMetereologiaUpdateComponent } from 'app/entities/monitoreo/resultado-metereologia/resultado-metereologia-update.component';
import { ResultadoMetereologiaService } from 'app/entities/monitoreo/resultado-metereologia/resultado-metereologia.service';
import { ResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';

describe('Component Tests', () => {
  describe('ResultadoMetereologia Management Update Component', () => {
    let comp: ResultadoMetereologiaUpdateComponent;
    let fixture: ComponentFixture<ResultadoMetereologiaUpdateComponent>;
    let service: ResultadoMetereologiaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ResultadoMetereologiaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ResultadoMetereologiaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResultadoMetereologiaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResultadoMetereologiaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ResultadoMetereologia(123);
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
        const entity = new ResultadoMetereologia();
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
