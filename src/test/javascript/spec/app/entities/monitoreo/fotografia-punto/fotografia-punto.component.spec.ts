/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { FotografiaPuntoComponent } from 'app/entities/monitoreo/fotografia-punto/fotografia-punto.component';
import { FotografiaPuntoService } from 'app/entities/monitoreo/fotografia-punto/fotografia-punto.service';
import { FotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';

describe('Component Tests', () => {
  describe('FotografiaPunto Management Component', () => {
    let comp: FotografiaPuntoComponent;
    let fixture: ComponentFixture<FotografiaPuntoComponent>;
    let service: FotografiaPuntoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [FotografiaPuntoComponent],
        providers: []
      })
        .overrideTemplate(FotografiaPuntoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FotografiaPuntoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FotografiaPuntoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FotografiaPunto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fotografiaPuntos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
