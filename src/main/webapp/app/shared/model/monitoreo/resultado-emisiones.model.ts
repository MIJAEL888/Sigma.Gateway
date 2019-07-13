import { IResultado } from 'app/shared/model/monitoreo/resultado.model';

export interface IResultadoEmisiones {
  id?: number;
  tipoEquipo?: string;
  combustible?: string;
  consumo?: number;
  horaPorMes?: number;
  altura?: number;
  diametro?: number;
  seccion?: string;
  resultado?: IResultado;
}

export class ResultadoEmisiones implements IResultadoEmisiones {
  constructor(
    public id?: number,
    public tipoEquipo?: string,
    public combustible?: string,
    public consumo?: number,
    public horaPorMes?: number,
    public altura?: number,
    public diametro?: number,
    public seccion?: string,
    public resultado?: IResultado
  ) {}
}
