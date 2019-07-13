import { Moment } from 'moment';
import { IMonitorista } from 'app/shared/model/logistica/monitorista.model';

export interface ITipoSeguro {
  id?: number;
  nombre?: string;
  descripcion?: any;
  fechaCaudicidad?: Moment;
  codigoTipoSeguro?: number;
  monitoristas?: IMonitorista[];
}

export class TipoSeguro implements ITipoSeguro {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: any,
    public fechaCaudicidad?: Moment,
    public codigoTipoSeguro?: number,
    public monitoristas?: IMonitorista[]
  ) {}
}
