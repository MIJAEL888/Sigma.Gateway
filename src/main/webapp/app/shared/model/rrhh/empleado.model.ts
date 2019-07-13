import { Moment } from 'moment';
import { IPosicion } from 'app/shared/model/rrhh/posicion.model';

export const enum TipoDocumento {
  DNI = 'DNI',
  PASSAPORTE = 'PASSAPORTE',
  RUC = 'RUC'
}

export const enum TipoContrato {
  PLANILLA = 'PLANILLA',
  RECIBO = 'RECIBO'
}

export const enum TipoPension {
  SNP = 'SNP',
  SPP = 'SPP'
}

export const enum EstadoEmpleado {
  ACTIVO = 'ACTIVO',
  CESE = 'CESE'
}

export const enum EstadoCivil {
  SOLTERO = 'SOLTERO',
  CONVIVIENTE = 'CONVIVIENTE',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUDO = 'VIUDO',
  OTROS = 'OTROS'
}

export interface IEmpleado {
  id?: number;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  tipoDocumento?: TipoDocumento;
  numeroDocumento?: string;
  fechaNacimiento?: Moment;
  fechaIngreso?: Moment;
  tipoContrato?: TipoContrato;
  tipoAportacion?: TipoPension;
  estado?: EstadoEmpleado;
  fechaCreacion?: Moment;
  fechaActualizacion?: Moment;
  direccion?: string;
  estadoCivil?: EstadoCivil;
  posicion?: IPosicion;
}

export class Empleado implements IEmpleado {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellidoPaterno?: string,
    public apellidoMaterno?: string,
    public tipoDocumento?: TipoDocumento,
    public numeroDocumento?: string,
    public fechaNacimiento?: Moment,
    public fechaIngreso?: Moment,
    public tipoContrato?: TipoContrato,
    public tipoAportacion?: TipoPension,
    public estado?: EstadoEmpleado,
    public fechaCreacion?: Moment,
    public fechaActualizacion?: Moment,
    public direccion?: string,
    public estadoCivil?: EstadoCivil,
    public posicion?: IPosicion
  ) {}
}
