import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';

export interface IFotografiaMonitoreo {
  id?: number;
  nombre?: string;
  ruta?: string;
  extension?: string;
  fotografiaContentType?: string;
  fotografia?: any;
  puntoMonitoreoObs?: IPuntoMonitoreoObs;
}

export class FotografiaMonitoreo implements IFotografiaMonitoreo {
  constructor(
    public id?: number,
    public nombre?: string,
    public ruta?: string,
    public extension?: string,
    public fotografiaContentType?: string,
    public fotografia?: any,
    public puntoMonitoreoObs?: IPuntoMonitoreoObs
  ) {}
}
