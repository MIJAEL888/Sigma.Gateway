/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { FotografiaMonitoreoUpdateComponent } from 'app/entities/monitoreo/fotografia-monitoreo/fotografia-monitoreo-update.component';
import { FotografiaMonitoreoService } from 'app/entities/monitoreo/fotografia-monitoreo/fotografia-monitoreo.service';
import { FotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';

describe('Component Tests', () => {
  describe('FotografiaMonitoreo Management Update Component', () => {
    let comp: FotografiaMonitoreoUpdateComponent;
    let fixture: ComponentFixture<FotografiaMonitoreoUpdateComponent>;
    let service: FotografiaMonitoreoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [FotografiaMonitoreoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FotografiaMonitoreoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FotografiaMonitoreoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FotografiaMonitoreoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FotografiaMonitoreo(123);
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
        const entity = new FotografiaMonitoreo();
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
