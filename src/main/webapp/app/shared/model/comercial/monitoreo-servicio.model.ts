import { IServicio } from 'app/shared/model/comercial/servicio.model';
import { IParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';

export interface IMonitoreoServicio {
  id?: number;
  cantidad?: number;
  costoTotal?: number;
  servicio?: IServicio;
  paramentroMonitoreo?: IParamentroMonitoreo;
}

export class MonitoreoServicio implements IMonitoreoServicio {
  constructor(
    public id?: number,
    public cantidad?: number,
    public costoTotal?: number,
    public servicio?: IServicio,
    public paramentroMonitoreo?: IParamentroMonitoreo
  ) {}
}
