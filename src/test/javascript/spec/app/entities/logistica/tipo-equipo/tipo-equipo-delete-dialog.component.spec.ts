/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { TipoEquipoDeleteDialogComponent } from 'app/entities/logistica/tipo-equipo/tipo-equipo-delete-dialog.component';
import { TipoEquipoService } from 'app/entities/logistica/tipo-equipo/tipo-equipo.service';

describe('Component Tests', () => {
  describe('TipoEquipo Management Delete Component', () => {
    let comp: TipoEquipoDeleteDialogComponent;
    let fixture: ComponentFixture<TipoEquipoDeleteDialogComponent>;
    let service: TipoEquipoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoEquipoDeleteDialogComponent]
      })
        .overrideTemplate(TipoEquipoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoEquipoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoEquipoService);
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
