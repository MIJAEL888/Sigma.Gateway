import { IModelo } from 'app/shared/model/logistica/modelo.model';

export interface ITipoEquipo {
  id?: number;
  nombre?: string;
  codigo?: string;
  descripcion?: any;
  modelos?: IModelo[];
}

export class TipoEquipo implements ITipoEquipo {
  constructor(public id?: number, public nombre?: string, public codigo?: string, public descripcion?: any, public modelos?: IModelo[]) {}
}
