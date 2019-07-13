/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { EquipoMonitoreoUpdateComponent } from 'app/entities/monitoreo/equipo-monitoreo/equipo-monitoreo-update.component';
import { EquipoMonitoreoService } from 'app/entities/monitoreo/equipo-monitoreo/equipo-monitoreo.service';
import { EquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';

describe('Component Tests', () => {
  describe('EquipoMonitoreo Management Update Component', () => {
    let comp: EquipoMonitoreoUpdateComponent;
    let fixture: ComponentFixture<EquipoMonitoreoUpdateComponent>;
    let service: EquipoMonitoreoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EquipoMonitoreoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EquipoMonitoreoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EquipoMonitoreoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EquipoMonitoreoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EquipoMonitoreo(123);
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
        const entity = new EquipoMonitoreo();
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
