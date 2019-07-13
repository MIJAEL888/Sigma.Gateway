import { IEquipo } from 'app/shared/model/logistica/equipo.model';
import { ITipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';
import { IMarca } from 'app/shared/model/logistica/marca.model';

export interface IModelo {
  id?: number;
  nombre?: string;
  descripcion?: any;
  equipos?: IEquipo[];
  tipoEuipo?: ITipoEquipo;
  marca?: IMarca;
}

export class Modelo implements IModelo {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: any,
    public equipos?: IEquipo[],
    public tipoEuipo?: ITipoEquipo,
    public marca?: IMarca
  ) {}
}
