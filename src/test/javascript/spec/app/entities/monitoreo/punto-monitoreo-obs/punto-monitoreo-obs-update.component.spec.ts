/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PuntoMonitoreoObsUpdateComponent } from 'app/entities/monitoreo/punto-monitoreo-obs/punto-monitoreo-obs-update.component';
import { PuntoMonitoreoObsService } from 'app/entities/monitoreo/punto-monitoreo-obs/punto-monitoreo-obs.service';
import { PuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';

describe('Component Tests', () => {
  describe('PuntoMonitoreoObs Management Update Component', () => {
    let comp: PuntoMonitoreoObsUpdateComponent;
    let fixture: ComponentFixture<PuntoMonitoreoObsUpdateComponent>;
    let service: PuntoMonitoreoObsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PuntoMonitoreoObsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PuntoMonitoreoObsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PuntoMonitoreoObsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PuntoMonitoreoObsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PuntoMonitoreoObs(123);
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
        const entity = new PuntoMonitoreoObs();
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
