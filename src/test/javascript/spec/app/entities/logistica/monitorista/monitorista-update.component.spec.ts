/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MonitoristaUpdateComponent } from 'app/entities/logistica/monitorista/monitorista-update.component';
import { MonitoristaService } from 'app/entities/logistica/monitorista/monitorista.service';
import { Monitorista } from 'app/shared/model/logistica/monitorista.model';

describe('Component Tests', () => {
  describe('Monitorista Management Update Component', () => {
    let comp: MonitoristaUpdateComponent;
    let fixture: ComponentFixture<MonitoristaUpdateComponent>;
    let service: MonitoristaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MonitoristaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MonitoristaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MonitoristaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MonitoristaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Monitorista(123);
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
        const entity = new Monitorista();
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
