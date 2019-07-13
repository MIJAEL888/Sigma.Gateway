/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { SedeService } from 'app/entities/comercial/sede/sede.service';
import { ISede, Sede } from 'app/shared/model/comercial/sede.model';

describe('Service Tests', () => {
  describe('Sede Service', () => {
    let injector: TestBed;
    let service: SedeService;
    let httpMock: HttpTestingController;
    let elemDefault: ISede;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(SedeService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Sede(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Sede', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new Sede(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Sede', async () => {
        const returnedFromService = Object.assign(
          {
            direccion: 'BBBBBB',
            referencia: 'BBBBBB',
            latitud: 'BBBBBB',
            longitud: 'BBBBBB',
            actividad: 'BBBBBB',
            telefono: 'BBBBBB',
            descripcion: 'BBBBBB',
            comentario: 'BBBBBB',
            rutaDocEstudio: 'BBBBBB',
            nombreDocEstudio: 'BBBBBB',
            documentoEstudio: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Sede', async () => {
        const returnedFromService = Object.assign(
          {
            direccion: 'BBBBBB',
            referencia: 'BBBBBB',
            latitud: 'BBBBBB',
            longitud: 'BBBBBB',
            actividad: 'BBBBBB',
            telefono: 'BBBBBB',
            descripcion: 'BBBBBB',
            comentario: 'BBBBBB',
            rutaDocEstudio: 'BBBBBB',
            nombreDocEstudio: 'BBBBBB',
            documentoEstudio: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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

      it('should delete a Sede', async () => {
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
