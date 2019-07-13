/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PuntoMonitoreoUpdateComponent } from 'app/entities/monitoreo/punto-monitoreo/punto-monitoreo-update.component';
import { PuntoMonitoreoService } from 'app/entities/monitoreo/punto-monitoreo/punto-monitoreo.service';
import { PuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';

describe('Component Tests', () => {
  describe('PuntoMonitoreo Management Update Component', () => {
    let comp: PuntoMonitoreoUpdateComponent;
    let fixture: ComponentFixture<PuntoMonitoreoUpdateComponent>;
    let service: PuntoMonitoreoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PuntoMonitoreoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PuntoMonitoreoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PuntoMonitoreoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PuntoMonitoreoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PuntoMonitoreo(123);
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
        const entity = new PuntoMonitoreo();
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
