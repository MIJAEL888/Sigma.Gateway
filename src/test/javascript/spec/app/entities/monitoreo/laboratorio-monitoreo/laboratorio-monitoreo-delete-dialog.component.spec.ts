/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { LaboratorioMonitoreoDeleteDialogComponent } from 'app/entities/monitoreo/laboratorio-monitoreo/laboratorio-monitoreo-delete-dialog.component';
import { LaboratorioMonitoreoService } from 'app/entities/monitoreo/laboratorio-monitoreo/laboratorio-monitoreo.service';

describe('Component Tests', () => {
  describe('LaboratorioMonitoreo Management Delete Component', () => {
    let comp: LaboratorioMonitoreoDeleteDialogComponent;
    let fixture: ComponentFixture<LaboratorioMonitoreoDeleteDialogComponent>;
    let service: LaboratorioMonitoreoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LaboratorioMonitoreoDeleteDialogComponent]
      })
        .overrideTemplate(LaboratorioMonitoreoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LaboratorioMonitoreoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LaboratorioMonitoreoService);
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
