import { Moment } from 'moment';
import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';

export interface IEquipoMonitoreo {
  id?: number;
  codigoEquipo?: string;
  reservadoDesde?: Moment;
  reservadoHasta?: Moment;
  documentoCalibracion?: string;
  proyecto?: IProyecto;
}

export class EquipoMonitoreo implements IEquipoMonitoreo {
  constructor(
    public id?: number,
    public codigoEquipo?: string,
    public reservadoDesde?: Moment,
    public reservadoHasta?: Moment,
    public documentoCalibracion?: string,
    public proyecto?: IProyecto
  ) {}
}
