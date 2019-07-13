import { IServicio } from 'app/shared/model/comercial/servicio.model';

export interface ITipoServicios {
  id?: number;
  nombre?: string;
  descripcion?: string;
  sevicios?: IServicio[];
}

export class TipoServicios implements ITipoServicios {
  constructor(public id?: number, public nombre?: string, public descripcion?: string, public sevicios?: IServicio[]) {}
}
