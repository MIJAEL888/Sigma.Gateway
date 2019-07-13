/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TipoEquipoUpdateComponent } from 'app/entities/logistica/tipo-equipo/tipo-equipo-update.component';
import { TipoEquipoService } from 'app/entities/logistica/tipo-equipo/tipo-equipo.service';
import { TipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';

describe('Component Tests', () => {
  describe('TipoEquipo Management Update Component', () => {
    let comp: TipoEquipoUpdateComponent;
    let fixture: ComponentFixture<TipoEquipoUpdateComponent>;
    let service: TipoEquipoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoEquipoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoEquipoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoEquipoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoEquipoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoEquipo(123);
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
        const entity = new TipoEquipo();
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
