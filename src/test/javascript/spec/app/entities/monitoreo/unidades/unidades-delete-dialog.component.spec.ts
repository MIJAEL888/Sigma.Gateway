/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { UnidadesDeleteDialogComponent } from 'app/entities/monitoreo/unidades/unidades-delete-dialog.component';
import { UnidadesService } from 'app/entities/monitoreo/unidades/unidades.service';

describe('Component Tests', () => {
  describe('Unidades Management Delete Component', () => {
    let comp: UnidadesDeleteDialogComponent;
    let fixture: ComponentFixture<UnidadesDeleteDialogComponent>;
    let service: UnidadesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UnidadesDeleteDialogComponent]
      })
        .overrideTemplate(UnidadesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnidadesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnidadesService);
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
