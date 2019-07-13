/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { FotografiaPuntoUpdateComponent } from 'app/entities/monitoreo/fotografia-punto/fotografia-punto-update.component';
import { FotografiaPuntoService } from 'app/entities/monitoreo/fotografia-punto/fotografia-punto.service';
import { FotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';

describe('Component Tests', () => {
  describe('FotografiaPunto Management Update Component', () => {
    let comp: FotografiaPuntoUpdateComponent;
    let fixture: ComponentFixture<FotografiaPuntoUpdateComponent>;
    let service: FotografiaPuntoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [FotografiaPuntoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FotografiaPuntoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FotografiaPuntoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FotografiaPuntoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FotografiaPunto(123);
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
        const entity = new FotografiaPunto();
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
