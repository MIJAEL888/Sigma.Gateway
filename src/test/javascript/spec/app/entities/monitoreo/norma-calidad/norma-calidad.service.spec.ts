/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { NormaCalidadService } from 'app/entities/monitoreo/norma-calidad/norma-calidad.service';
import { INormaCalidad, NormaCalidad, TipoNorma } from 'app/shared/model/monitoreo/norma-calidad.model';

describe('Service Tests', () => {
  describe('NormaCalidad Service', () => {
    let injector: TestBed;
    let service: NormaCalidadService;
    let httpMock: HttpTestingController;
    let elemDefault: INormaCalidad;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(NormaCalidadService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new NormaCalidad(
        0,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        TipoNorma.NACIONAL,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            fechaPublicacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a NormaCalidad', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaPublicacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaPublicacion: currentDate
          },
          returnedFromService
        );
        service
          .create(new NormaCalidad(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a NormaCalidad', async () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            codigo: 'BBBBBB',
            fechaPublicacion: currentDate.format(DATE_FORMAT),
            tipo: 'BBBBBB',
            fuente: 'BBBBBB',
            rutaDocNorma: 'BBBBBB',
            nombreDocNorma: 'BBBBBB',
            documentoNorma: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPublicacion: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of NormaCalidad', async () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            codigo: 'BBBBBB',
            fechaPublicacion: currentDate.format(DATE_FORMAT),
            tipo: 'BBBBBB',
            fuente: 'BBBBBB',
            rutaDocNorma: 'BBBBBB',
            nombreDocNorma: 'BBBBBB',
            documentoNorma: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaPublicacion: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NormaCalidad', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
