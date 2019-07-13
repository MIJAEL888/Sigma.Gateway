/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { TipoSeguroService } from 'app/entities/logistica/tipo-seguro/tipo-seguro.service';
import { ITipoSeguro, TipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';

describe('Service Tests', () => {
  describe('TipoSeguro Service', () => {
    let injector: TestBed;
    let service: TipoSeguroService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipoSeguro;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(TipoSeguroService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new TipoSeguro(0, 'AAAAAAA', 'AAAAAAA', currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            fechaCaudicidad: currentDate.format(DATE_FORMAT)
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

      it('should create a TipoSeguro', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaCaudicidad: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaCaudicidad: currentDate
          },
          returnedFromService
        );
        service
          .create(new TipoSeguro(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a TipoSeguro', async () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            descripcion: 'BBBBBB',
            fechaCaudicidad: currentDate.format(DATE_FORMAT),
            codigoTipoSeguro: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaCaudicidad: currentDate
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

      it('should return a list of TipoSeguro', async () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            descripcion: 'BBBBBB',
            fechaCaudicidad: currentDate.format(DATE_FORMAT),
            codigoTipoSeguro: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaCaudicidad: currentDate
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

      it('should delete a TipoSeguro', async () => {
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
