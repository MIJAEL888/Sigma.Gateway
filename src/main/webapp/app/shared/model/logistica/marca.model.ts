import { IModelo } from 'app/shared/model/logistica/modelo.model';

export interface IMarca {
  id?: number;
  nombre?: string;
  descripcion?: any;
  modelos?: IModelo[];
}

export class Marca implements IMarca {
  constructor(public id?: number, public nombre?: string, public descripcion?: any, public modelos?: IModelo[]) {}
}
