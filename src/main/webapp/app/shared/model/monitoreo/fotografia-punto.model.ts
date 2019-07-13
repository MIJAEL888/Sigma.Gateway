import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';

export interface IFotografiaPunto {
  id?: number;
  nombre?: string;
  ruta?: string;
  extension?: string;
  fotografiaContentType?: string;
  fotografia?: any;
  puntoMonitoreo?: IPuntoMonitoreo;
}

export class FotografiaPunto implements IFotografiaPunto {
  constructor(
    public id?: number,
    public nombre?: string,
    public ruta?: string,
    public extension?: string,
    public fotografiaContentType?: string,
    public fotografia?: any,
    public puntoMonitoreo?: IPuntoMonitoreo
  ) {}
}
