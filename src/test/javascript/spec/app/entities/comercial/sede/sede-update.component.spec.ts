/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SedeUpdateComponent } from 'app/entities/comercial/sede/sede-update.component';
import { SedeService } from 'app/entities/comercial/sede/sede.service';
import { Sede } from 'app/shared/model/comercial/sede.model';

describe('Component Tests', () => {
  describe('Sede Management Update Component', () => {
    let comp: SedeUpdateComponent;
    let fixture: ComponentFixture<SedeUpdateComponent>;
    let service: SedeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SedeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SedeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SedeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SedeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sede(123);
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
        const entity = new Sede();
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
