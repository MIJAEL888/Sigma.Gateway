/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ComponenteMonitoreoUpdateComponent } from 'app/entities/comercial/componente-monitoreo/componente-monitoreo-update.component';
import { ComponenteMonitoreoService } from 'app/entities/comercial/componente-monitoreo/componente-monitoreo.service';
import { ComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';

describe('Component Tests', () => {
  describe('ComponenteMonitoreo Management Update Component', () => {
    let comp: ComponenteMonitoreoUpdateComponent;
    let fixture: ComponentFixture<ComponenteMonitoreoUpdateComponent>;
    let service: ComponenteMonitoreoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ComponenteMonitoreoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ComponenteMonitoreoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ComponenteMonitoreoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ComponenteMonitoreoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ComponenteMonitoreo(123);
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
        const entity = new ComponenteMonitoreo();
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
