/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TipoSeguroUpdateComponent } from 'app/entities/logistica/tipo-seguro/tipo-seguro-update.component';
import { TipoSeguroService } from 'app/entities/logistica/tipo-seguro/tipo-seguro.service';
import { TipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';

describe('Component Tests', () => {
  describe('TipoSeguro Management Update Component', () => {
    let comp: TipoSeguroUpdateComponent;
    let fixture: ComponentFixture<TipoSeguroUpdateComponent>;
    let service: TipoSeguroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoSeguroUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoSeguroUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoSeguroUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoSeguroService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoSeguro(123);
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
        const entity = new TipoSeguro();
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
