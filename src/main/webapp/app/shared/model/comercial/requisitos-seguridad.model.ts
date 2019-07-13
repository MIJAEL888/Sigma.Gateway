import { IServicio } from 'app/shared/model/comercial/servicio.model';

export interface IRequisitosSeguridad {
  id?: number;
  nombre?: string;
  descripcion?: string;
  sevicios?: IServicio[];
}

export class RequisitosSeguridad implements IRequisitosSeguridad {
  constructor(public id?: number, public nombre?: string, public descripcion?: string, public sevicios?: IServicio[]) {}
}
