/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { EquipoDeleteDialogComponent } from 'app/entities/logistica/equipo/equipo-delete-dialog.component';
import { EquipoService } from 'app/entities/logistica/equipo/equipo.service';

describe('Component Tests', () => {
  describe('Equipo Management Delete Component', () => {
    let comp: EquipoDeleteDialogComponent;
    let fixture: ComponentFixture<EquipoDeleteDialogComponent>;
    let service: EquipoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EquipoDeleteDialogComponent]
      })
        .overrideTemplate(EquipoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EquipoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EquipoService);
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
