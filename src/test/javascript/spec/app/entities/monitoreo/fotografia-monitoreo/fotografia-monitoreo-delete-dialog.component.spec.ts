/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { FotografiaMonitoreoDeleteDialogComponent } from 'app/entities/monitoreo/fotografia-monitoreo/fotografia-monitoreo-delete-dialog.component';
import { FotografiaMonitoreoService } from 'app/entities/monitoreo/fotografia-monitoreo/fotografia-monitoreo.service';

describe('Component Tests', () => {
  describe('FotografiaMonitoreo Management Delete Component', () => {
    let comp: FotografiaMonitoreoDeleteDialogComponent;
    let fixture: ComponentFixture<FotografiaMonitoreoDeleteDialogComponent>;
    let service: FotografiaMonitoreoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [FotografiaMonitoreoDeleteDialogComponent]
      })
        .overrideTemplate(FotografiaMonitoreoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FotografiaMonitoreoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FotografiaMonitoreoService);
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
