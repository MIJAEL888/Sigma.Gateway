import { IServicio } from 'app/shared/model/comercial/servicio.model';

export interface ITipoSolicitud {
  id?: number;
  nombre?: string;
  descripcion?: string;
  sevicios?: IServicio[];
}

export class TipoSolicitud implements ITipoSolicitud {
  constructor(public id?: number, public nombre?: string, public descripcion?: string, public sevicios?: IServicio[]) {}
}
