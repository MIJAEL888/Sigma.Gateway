/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ContactoSedeDeleteDialogComponent } from 'app/entities/comercial/contacto-sede/contacto-sede-delete-dialog.component';
import { ContactoSedeService } from 'app/entities/comercial/contacto-sede/contacto-sede.service';

describe('Component Tests', () => {
  describe('ContactoSede Management Delete Component', () => {
    let comp: ContactoSedeDeleteDialogComponent;
    let fixture: ComponentFixture<ContactoSedeDeleteDialogComponent>;
    let service: ContactoSedeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ContactoSedeDeleteDialogComponent]
      })
        .overrideTemplate(ContactoSedeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactoSedeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactoSedeService);
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
