/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { DistritoComponent } from 'app/entities/comercial/distrito/distrito.component';
import { DistritoService } from 'app/entities/comercial/distrito/distrito.service';
import { Distrito } from 'app/shared/model/comercial/distrito.model';

describe('Component Tests', () => {
  describe('Distrito Management Component', () => {
    let comp: DistritoComponent;
    let fixture: ComponentFixture<DistritoComponent>;
    let service: DistritoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DistritoComponent],
        providers: []
      })
        .overrideTemplate(DistritoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DistritoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DistritoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Distrito(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.distritos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
