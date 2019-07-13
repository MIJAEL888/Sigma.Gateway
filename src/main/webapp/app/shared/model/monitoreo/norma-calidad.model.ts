import { Moment } from 'moment';
import { IParamentro } from 'app/shared/model/monitoreo/paramentro.model';

export const enum TipoNorma {
  NACIONAL = 'NACIONAL',
  INTERNACIONAL = 'INTERNACIONAL'
}

export interface INormaCalidad {
  id?: number;
  nombre?: string;
  codigo?: string;
  fechaPublicacion?: Moment;
  tipo?: TipoNorma;
  fuente?: string;
  rutaDocNorma?: string;
  nombreDocNorma?: string;
  documentoNormaContentType?: string;
  documentoNorma?: any;
  paramentros?: IParamentro[];
}

export class NormaCalidad implements INormaCalidad {
  constructor(
    public id?: number,
    public nombre?: string,
    public codigo?: string,
    public fechaPublicacion?: Moment,
    public tipo?: TipoNorma,
    public fuente?: string,
    public rutaDocNorma?: string,
    public nombreDocNorma?: string,
    public documentoNormaContentType?: string,
    public documentoNorma?: any,
    public paramentros?: IParamentro[]
  ) {}
}
