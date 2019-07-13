/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EquipoMonitoreoService } from 'app/entities/monitoreo/equipo-monitoreo/equipo-monitoreo.service';
import { IEquipoMonitoreo, EquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';

describe('Service Tests', () => {
  describe('EquipoMonitoreo Service', () => {
    let injector: TestBed;
    let service: EquipoMonitoreoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEquipoMonitoreo;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(EquipoMonitoreoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new EquipoMonitoreo(0, 'AAAAAAA', currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            reservadoDesde: currentDate.format(DATE_FORMAT),
            reservadoHasta: currentDate.format(DATE_FORMAT)
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

      it('should create a EquipoMonitoreo', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            reservadoDesde: currentDate.format(DATE_FORMAT),
            reservadoHasta: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            reservadoDesde: currentDate,
            reservadoHasta: currentDate
          },
          returnedFromService
        );
        service
          .create(new EquipoMonitoreo(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a EquipoMonitoreo', async () => {
        const returnedFromService = Object.assign(
          {
            codigoEquipo: 'BBBBBB',
            reservadoDesde: currentDate.format(DATE_FORMAT),
            reservadoHasta: currentDate.format(DATE_FORMAT),
            documentoCalibracion: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            reservadoDesde: currentDate,
            reservadoHasta: currentDate
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

      it('should return a list of EquipoMonitoreo', async () => {
        const returnedFromService = Object.assign(
          {
            codigoEquipo: 'BBBBBB',
            reservadoDesde: currentDate.format(DATE_FORMAT),
            reservadoHasta: currentDate.format(DATE_FORMAT),
            documentoCalibracion: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            reservadoDesde: currentDate,
            reservadoHasta: currentDate
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

      it('should delete a EquipoMonitoreo', async () => {
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
