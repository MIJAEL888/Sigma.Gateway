/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { EquipoMonitoreoDeleteDialogComponent } from 'app/entities/monitoreo/equipo-monitoreo/equipo-monitoreo-delete-dialog.component';
import { EquipoMonitoreoService } from 'app/entities/monitoreo/equipo-monitoreo/equipo-monitoreo.service';

describe('Component Tests', () => {
  describe('EquipoMonitoreo Management Delete Component', () => {
    let comp: EquipoMonitoreoDeleteDialogComponent;
    let fixture: ComponentFixture<EquipoMonitoreoDeleteDialogComponent>;
    let service: EquipoMonitoreoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EquipoMonitoreoDeleteDialogComponent]
      })
        .overrideTemplate(EquipoMonitoreoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EquipoMonitoreoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EquipoMonitoreoService);
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
