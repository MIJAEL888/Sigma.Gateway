/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ResultadoUpdateComponent } from 'app/entities/monitoreo/resultado/resultado-update.component';
import { ResultadoService } from 'app/entities/monitoreo/resultado/resultado.service';
import { Resultado } from 'app/shared/model/monitoreo/resultado.model';

describe('Component Tests', () => {
  describe('Resultado Management Update Component', () => {
    let comp: ResultadoUpdateComponent;
    let fixture: ComponentFixture<ResultadoUpdateComponent>;
    let service: ResultadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ResultadoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ResultadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResultadoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResultadoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Resultado(123);
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
        const entity = new Resultado();
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
