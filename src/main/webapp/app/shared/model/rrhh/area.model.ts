import { IPosicion } from 'app/shared/model/rrhh/posicion.model';
import { IArea } from 'app/shared/model/rrhh/area.model';

export interface IArea {
  id?: number;
  nombre?: string;
  descripcion?: any;
  comentario?: any;
  areas?: IPosicion[];
  gerencia?: IArea;
}

export class Area implements IArea {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: any,
    public comentario?: any,
    public areas?: IPosicion[],
    public gerencia?: IArea
  ) {}
}
