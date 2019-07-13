/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ParamentroDeleteDialogComponent } from 'app/entities/monitoreo/paramentro/paramentro-delete-dialog.component';
import { ParamentroService } from 'app/entities/monitoreo/paramentro/paramentro.service';

describe('Component Tests', () => {
  describe('Paramentro Management Delete Component', () => {
    let comp: ParamentroDeleteDialogComponent;
    let fixture: ComponentFixture<ParamentroDeleteDialogComponent>;
    let service: ParamentroService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ParamentroDeleteDialogComponent]
      })
        .overrideTemplate(ParamentroDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamentroDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamentroService);
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
