/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ParamentroUpdateComponent } from 'app/entities/monitoreo/paramentro/paramentro-update.component';
import { ParamentroService } from 'app/entities/monitoreo/paramentro/paramentro.service';
import { Paramentro } from 'app/shared/model/monitoreo/paramentro.model';

describe('Component Tests', () => {
  describe('Paramentro Management Update Component', () => {
    let comp: ParamentroUpdateComponent;
    let fixture: ComponentFixture<ParamentroUpdateComponent>;
    let service: ParamentroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ParamentroUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParamentroUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamentroUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamentroService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Paramentro(123);
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
        const entity = new Paramentro();
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
