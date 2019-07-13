/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ComponenteComponent } from 'app/entities/monitoreo/componente/componente.component';
import { ComponenteService } from 'app/entities/monitoreo/componente/componente.service';
import { Componente } from 'app/shared/model/monitoreo/componente.model';

describe('Component Tests', () => {
  describe('Componente Management Component', () => {
    let comp: ComponenteComponent;
    let fixture: ComponentFixture<ComponenteComponent>;
    let service: ComponenteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ComponenteComponent],
        providers: []
      })
        .overrideTemplate(ComponenteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ComponenteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ComponenteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Componente(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.componentes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
