import { IServicio } from 'app/shared/model/comercial/servicio.model';

export interface ITipoInduccion {
  id?: number;
  nombre?: string;
  descripcion?: string;
  sevicios?: IServicio[];
}

export class TipoInduccion implements ITipoInduccion {
  constructor(public id?: number, public nombre?: string, public descripcion?: string, public sevicios?: IServicio[]) {}
}
