/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ResultadoEmisionesUpdateComponent } from 'app/entities/monitoreo/resultado-emisiones/resultado-emisiones-update.component';
import { ResultadoEmisionesService } from 'app/entities/monitoreo/resultado-emisiones/resultado-emisiones.service';
import { ResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';

describe('Component Tests', () => {
  describe('ResultadoEmisiones Management Update Component', () => {
    let comp: ResultadoEmisionesUpdateComponent;
    let fixture: ComponentFixture<ResultadoEmisionesUpdateComponent>;
    let service: ResultadoEmisionesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ResultadoEmisionesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ResultadoEmisionesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResultadoEmisionesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResultadoEmisionesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ResultadoEmisiones(123);
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
        const entity = new ResultadoEmisiones();
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
