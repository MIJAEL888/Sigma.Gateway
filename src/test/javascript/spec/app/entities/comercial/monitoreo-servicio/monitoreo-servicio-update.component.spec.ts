/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MonitoreoServicioUpdateComponent } from 'app/entities/comercial/monitoreo-servicio/monitoreo-servicio-update.component';
import { MonitoreoServicioService } from 'app/entities/comercial/monitoreo-servicio/monitoreo-servicio.service';
import { MonitoreoServicio } from 'app/shared/model/comercial/monitoreo-servicio.model';

describe('Component Tests', () => {
  describe('MonitoreoServicio Management Update Component', () => {
    let comp: MonitoreoServicioUpdateComponent;
    let fixture: ComponentFixture<MonitoreoServicioUpdateComponent>;
    let service: MonitoreoServicioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MonitoreoServicioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MonitoreoServicioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MonitoreoServicioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MonitoreoServicioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MonitoreoServicio(123);
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
        const entity = new MonitoreoServicio();
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
