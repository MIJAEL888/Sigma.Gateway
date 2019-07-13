/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { TipoSeguroDeleteDialogComponent } from 'app/entities/logistica/tipo-seguro/tipo-seguro-delete-dialog.component';
import { TipoSeguroService } from 'app/entities/logistica/tipo-seguro/tipo-seguro.service';

describe('Component Tests', () => {
  describe('TipoSeguro Management Delete Component', () => {
    let comp: TipoSeguroDeleteDialogComponent;
    let fixture: ComponentFixture<TipoSeguroDeleteDialogComponent>;
    let service: TipoSeguroService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoSeguroDeleteDialogComponent]
      })
        .overrideTemplate(TipoSeguroDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoSeguroDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoSeguroService);
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
