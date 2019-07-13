import { ITipoComponente } from 'app/shared/model/monitoreo/tipo-componente.model';
import { IObservacion } from 'app/shared/model/monitoreo/observacion.model';

export interface IComponente {
  id?: number;
  nombre?: string;
  descripcion?: string;
  protocolo?: any;
  guia?: string;
  iso?: string;
  objetivos?: any;
  tipoComponentes?: ITipoComponente[];
  observacions?: IObservacion[];
}

export class Componente implements IComponente {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public protocolo?: any,
    public guia?: string,
    public iso?: string,
    public objetivos?: any,
    public tipoComponentes?: ITipoComponente[],
    public observacions?: IObservacion[]
  ) {}
}
