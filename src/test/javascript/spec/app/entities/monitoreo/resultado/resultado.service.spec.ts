/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ResultadoService } from 'app/entities/monitoreo/resultado/resultado.service';
import { IResultado, Resultado } from 'app/shared/model/monitoreo/resultado.model';

describe('Service Tests', () => {
  describe('Resultado Service', () => {
    let injector: TestBed;
    let service: ResultadoService;
    let httpMock: HttpTestingController;
    let elemDefault: IResultado;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ResultadoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Resultado(0, currentDate, currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            fechaInicio: currentDate.format(DATE_TIME_FORMAT),
            fehcaFin: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Resultado', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaInicio: currentDate.format(DATE_TIME_FORMAT),
            fehcaFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fehcaFin: currentDate
          },
          returnedFromService
        );
        service
          .create(new Resultado(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Resultado', async () => {
        const returnedFromService = Object.assign(
          {
            fechaInicio: currentDate.format(DATE_TIME_FORMAT),
            fehcaFin: currentDate.format(DATE_TIME_FORMAT),
            valorMinimo: 'BBBBBB',
            valorMaximo: 'BBBBBB',
            valorFinal: 'BBBBBB',
            valorFinalNum: 1,
            codigoLaboratorio: 'BBBBBB',
            codigoEquipo: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fehcaFin: currentDate
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

      it('should return a list of Resultado', async () => {
        const returnedFromService = Object.assign(
          {
            fechaInicio: currentDate.format(DATE_TIME_FORMAT),
            fehcaFin: currentDate.format(DATE_TIME_FORMAT),
            valorMinimo: 'BBBBBB',
            valorMaximo: 'BBBBBB',
            valorFinal: 'BBBBBB',
            valorFinalNum: 1,
            codigoLaboratorio: 'BBBBBB',
            codigoEquipo: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fehcaFin: currentDate
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

      it('should delete a Resultado', async () => {
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
