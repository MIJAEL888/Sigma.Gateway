/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ObservacionDeleteDialogComponent } from 'app/entities/monitoreo/observacion/observacion-delete-dialog.component';
import { ObservacionService } from 'app/entities/monitoreo/observacion/observacion.service';

describe('Component Tests', () => {
  describe('Observacion Management Delete Component', () => {
    let comp: ObservacionDeleteDialogComponent;
    let fixture: ComponentFixture<ObservacionDeleteDialogComponent>;
    let service: ObservacionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ObservacionDeleteDialogComponent]
      })
        .overrideTemplate(ObservacionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ObservacionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ObservacionService);
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
