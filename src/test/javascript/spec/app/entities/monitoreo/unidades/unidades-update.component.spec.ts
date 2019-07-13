/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { UnidadesUpdateComponent } from 'app/entities/monitoreo/unidades/unidades-update.component';
import { UnidadesService } from 'app/entities/monitoreo/unidades/unidades.service';
import { Unidades } from 'app/shared/model/monitoreo/unidades.model';

describe('Component Tests', () => {
  describe('Unidades Management Update Component', () => {
    let comp: UnidadesUpdateComponent;
    let fixture: ComponentFixture<UnidadesUpdateComponent>;
    let service: UnidadesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UnidadesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UnidadesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnidadesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnidadesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Unidades(123);
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
        const entity = new Unidades();
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
