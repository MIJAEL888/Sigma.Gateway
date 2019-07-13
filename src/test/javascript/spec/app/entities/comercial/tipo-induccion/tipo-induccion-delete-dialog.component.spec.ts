/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { TipoInduccionDeleteDialogComponent } from 'app/entities/comercial/tipo-induccion/tipo-induccion-delete-dialog.component';
import { TipoInduccionService } from 'app/entities/comercial/tipo-induccion/tipo-induccion.service';

describe('Component Tests', () => {
  describe('TipoInduccion Management Delete Component', () => {
    let comp: TipoInduccionDeleteDialogComponent;
    let fixture: ComponentFixture<TipoInduccionDeleteDialogComponent>;
    let service: TipoInduccionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoInduccionDeleteDialogComponent]
      })
        .overrideTemplate(TipoInduccionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoInduccionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoInduccionService);
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
