/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EquipoService } from 'app/entities/logistica/equipo/equipo.service';
import { IEquipo, Equipo, EstadoEquipo } from 'app/shared/model/logistica/equipo.model';

describe('Service Tests', () => {
  describe('Equipo Service', () => {
    let injector: TestBed;
    let service: EquipoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEquipo;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(EquipoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Equipo(
        0,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        EstadoEquipo.CALIBRADO,
        currentDate,
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
            calibradoDesde: currentDate.format(DATE_FORMAT),
            calibradoHasta: currentDate.format(DATE_FORMAT),
            fechaCompra: currentDate.format(DATE_FORMAT)
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

      it('should create a Equipo', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            calibradoDesde: currentDate.format(DATE_FORMAT),
            calibradoHasta: currentDate.format(DATE_FORMAT),
            fechaCompra: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            calibradoDesde: currentDate,
            calibradoHasta: currentDate,
            fechaCompra: currentDate
          },
          returnedFromService
        );
        service
          .create(new Equipo(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Equipo', async () => {
        const returnedFromService = Object.assign(
          {
            codigoEquipo: 'BBBBBB',
            serie: 'BBBBBB',
            calibradoDesde: currentDate.format(DATE_FORMAT),
            calibradoHasta: currentDate.format(DATE_FORMAT),
            rutaDocCalibracion: 'BBBBBB',
            nombreDocCalibracion: 'BBBBBB',
            documentoCalibracion: 'BBBBBB',
            estado: 'BBBBBB',
            fechaCompra: currentDate.format(DATE_FORMAT),
            observacion: 'BBBBBB',
            comentario: 'BBBBBB',
            test: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            calibradoDesde: currentDate,
            calibradoHasta: currentDate,
            fechaCompra: currentDate
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

      it('should return a list of Equipo', async () => {
        const returnedFromService = Object.assign(
          {
            codigoEquipo: 'BBBBBB',
            serie: 'BBBBBB',
            calibradoDesde: currentDate.format(DATE_FORMAT),
            calibradoHasta: currentDate.format(DATE_FORMAT),
            rutaDocCalibracion: 'BBBBBB',
            nombreDocCalibracion: 'BBBBBB',
            documentoCalibracion: 'BBBBBB',
            estado: 'BBBBBB',
            fechaCompra: currentDate.format(DATE_FORMAT),
            observacion: 'BBBBBB',
            comentario: 'BBBBBB',
            test: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            calibradoDesde: currentDate,
            calibradoHasta: currentDate,
            fechaCompra: currentDate
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

      it('should delete a Equipo', async () => {
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
