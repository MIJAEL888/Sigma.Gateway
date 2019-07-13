/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { MonitoreoServicioDeleteDialogComponent } from 'app/entities/comercial/monitoreo-servicio/monitoreo-servicio-delete-dialog.component';
import { MonitoreoServicioService } from 'app/entities/comercial/monitoreo-servicio/monitoreo-servicio.service';

describe('Component Tests', () => {
  describe('MonitoreoServicio Management Delete Component', () => {
    let comp: MonitoreoServicioDeleteDialogComponent;
    let fixture: ComponentFixture<MonitoreoServicioDeleteDialogComponent>;
    let service: MonitoreoServicioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MonitoreoServicioDeleteDialogComponent]
      })
        .overrideTemplate(MonitoreoServicioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MonitoreoServicioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MonitoreoServicioService);
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
