import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';
import { IParamentro } from 'app/shared/model/monitoreo/paramentro.model';
import { IFotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';

export interface IPuntoMonitoreo {
  id?: number;
  codigo?: string;
  codigoSede?: string;
  codigoCliente?: string;
  coordenadaNorte?: string;
  coordenadaEste?: string;
  descripcion?: any;
  comentario?: any;
  latitud?: number;
  longitud?: number;
  observacion?: any;
  puntoMonitoreoObs?: IPuntoMonitoreoObs[];
  paramentros?: IParamentro[];
  fotografiaPuntos?: IFotografiaPunto[];
}

export class PuntoMonitoreo implements IPuntoMonitoreo {
  constructor(
    public id?: number,
    public codigo?: string,
    public codigoSede?: string,
    public codigoCliente?: string,
    public coordenadaNorte?: string,
    public coordenadaEste?: string,
    public descripcion?: any,
    public comentario?: any,
    public latitud?: number,
    public longitud?: number,
    public observacion?: any,
    public puntoMonitoreoObs?: IPuntoMonitoreoObs[],
    public paramentros?: IParamentro[],
    public fotografiaPuntos?: IFotografiaPunto[]
  ) {}
}
