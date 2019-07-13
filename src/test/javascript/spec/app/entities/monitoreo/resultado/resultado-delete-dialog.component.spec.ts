/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ResultadoDeleteDialogComponent } from 'app/entities/monitoreo/resultado/resultado-delete-dialog.component';
import { ResultadoService } from 'app/entities/monitoreo/resultado/resultado.service';

describe('Component Tests', () => {
  describe('Resultado Management Delete Component', () => {
    let comp: ResultadoDeleteDialogComponent;
    let fixture: ComponentFixture<ResultadoDeleteDialogComponent>;
    let service: ResultadoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ResultadoDeleteDialogComponent]
      })
        .overrideTemplate(ResultadoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ResultadoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResultadoService);
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
