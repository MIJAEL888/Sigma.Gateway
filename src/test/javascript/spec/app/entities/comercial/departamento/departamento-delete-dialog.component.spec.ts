/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { DepartamentoDeleteDialogComponent } from 'app/entities/comercial/departamento/departamento-delete-dialog.component';
import { DepartamentoService } from 'app/entities/comercial/departamento/departamento.service';

describe('Component Tests', () => {
  describe('Departamento Management Delete Component', () => {
    let comp: DepartamentoDeleteDialogComponent;
    let fixture: ComponentFixture<DepartamentoDeleteDialogComponent>;
    let service: DepartamentoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DepartamentoDeleteDialogComponent]
      })
        .overrideTemplate(DepartamentoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartamentoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartamentoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
