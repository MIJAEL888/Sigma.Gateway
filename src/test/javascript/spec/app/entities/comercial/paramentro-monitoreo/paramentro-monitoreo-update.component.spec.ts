/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ParamentroMonitoreoUpdateComponent } from 'app/entities/comercial/paramentro-monitoreo/paramentro-monitoreo-update.component';
import { ParamentroMonitoreoService } from 'app/entities/comercial/paramentro-monitoreo/paramentro-monitoreo.service';
import { ParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';

describe('Component Tests', () => {
  describe('ParamentroMonitoreo Management Update Component', () => {
    let comp: ParamentroMonitoreoUpdateComponent;
    let fixture: ComponentFixture<ParamentroMonitoreoUpdateComponent>;
    let service: ParamentroMonitoreoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ParamentroMonitoreoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParamentroMonitoreoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamentroMonitoreoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamentroMonitoreoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParamentroMonitoreo(123);
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
        const entity = new ParamentroMonitoreo();
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
