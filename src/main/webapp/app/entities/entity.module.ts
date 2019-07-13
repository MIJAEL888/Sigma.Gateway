import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'empleado',
        loadChildren: './rrhh/empleado/empleado.module#RrhhEmpleadoModule'
      },
      {
        path: 'posicion',
        loadChildren: './rrhh/posicion/posicion.module#RrhhPosicionModule'
      },
      {
        path: 'area',
        loadChildren: './rrhh/area/area.module#RrhhAreaModule'
      },
      {
        path: 'equipo',
        loadChildren: './logistica/equipo/equipo.module#LogisticaEquipoModule'
      },
      {
        path: 'tipo-equipo',
        loadChildren: './logistica/tipo-equipo/tipo-equipo.module#LogisticaTipoEquipoModule'
      },
      {
        path: 'modelo',
        loadChildren: './logistica/modelo/modelo.module#LogisticaModeloModule'
      },
      {
        path: 'marca',
        loadChildren: './logistica/marca/marca.module#LogisticaMarcaModule'
      },
      {
        path: 'laboratorio',
        loadChildren: './logistica/laboratorio/laboratorio.module#LogisticaLaboratorioModule'
      },
      {
        path: 'monitorista',
        loadChildren: './logistica/monitorista/monitorista.module#LogisticaMonitoristaModule'
      },
      {
        path: 'tipo-seguro',
        loadChildren: './logistica/tipo-seguro/tipo-seguro.module#LogisticaTipoSeguroModule'
      },
      {
        path: 'servicio',
        loadChildren: './comercial/servicio/servicio.module#ComercialServicioModule'
      },
      {
        path: 'monitoreo-servicio',
        loadChildren: './comercial/monitoreo-servicio/monitoreo-servicio.module#ComercialMonitoreoServicioModule'
      },
      {
        path: 'componente-monitoreo',
        loadChildren: './comercial/componente-monitoreo/componente-monitoreo.module#ComercialComponenteMonitoreoModule'
      },
      {
        path: 'paramentro-monitoreo',
        loadChildren: './comercial/paramentro-monitoreo/paramentro-monitoreo.module#ComercialParamentroMonitoreoModule'
      },
      {
        path: 'tipo-servicios',
        loadChildren: './comercial/tipo-servicios/tipo-servicios.module#ComercialTipoServiciosModule'
      },
      {
        path: 'tipo-solicitud',
        loadChildren: './comercial/tipo-solicitud/tipo-solicitud.module#ComercialTipoSolicitudModule'
      },
      {
        path: 'tipo-induccion',
        loadChildren: './comercial/tipo-induccion/tipo-induccion.module#ComercialTipoInduccionModule'
      },
      {
        path: 'requisitos-seguridad',
        loadChildren: './comercial/requisitos-seguridad/requisitos-seguridad.module#ComercialRequisitosSeguridadModule'
      },
      {
        path: 'cliente',
        loadChildren: './comercial/cliente/cliente.module#ComercialClienteModule'
      },
      {
        path: 'sede',
        loadChildren: './comercial/sede/sede.module#ComercialSedeModule'
      },
      {
        path: 'contacto-sede',
        loadChildren: './comercial/contacto-sede/contacto-sede.module#ComercialContactoSedeModule'
      },
      {
        path: 'distrito',
        loadChildren: './comercial/distrito/distrito.module#ComercialDistritoModule'
      },
      {
        path: 'provincia',
        loadChildren: './comercial/provincia/provincia.module#ComercialProvinciaModule'
      },
      {
        path: 'departamento',
        loadChildren: './comercial/departamento/departamento.module#ComercialDepartamentoModule'
      },
      {
        path: 'proyecto',
        loadChildren: './monitoreo/proyecto/proyecto.module#MonitoreoProyectoModule'
      },
      {
        path: 'equipo-monitoreo',
        loadChildren: './monitoreo/equipo-monitoreo/equipo-monitoreo.module#MonitoreoEquipoMonitoreoModule'
      },
      {
        path: 'laboratorio-monitoreo',
        loadChildren: './monitoreo/laboratorio-monitoreo/laboratorio-monitoreo.module#MonitoreoLaboratorioMonitoreoModule'
      },
      {
        path: 'observacion',
        loadChildren: './monitoreo/observacion/observacion.module#MonitoreoObservacionModule'
      },
      {
        path: 'componente',
        loadChildren: './monitoreo/componente/componente.module#MonitoreoComponenteModule'
      },
      {
        path: 'tipo-componente',
        loadChildren: './monitoreo/tipo-componente/tipo-componente.module#MonitoreoTipoComponenteModule'
      },
      {
        path: 'paramentro',
        loadChildren: './monitoreo/paramentro/paramentro.module#MonitoreoParamentroModule'
      },
      {
        path: 'norma-calidad',
        loadChildren: './monitoreo/norma-calidad/norma-calidad.module#MonitoreoNormaCalidadModule'
      },
      {
        path: 'punto-monitoreo',
        loadChildren: './monitoreo/punto-monitoreo/punto-monitoreo.module#MonitoreoPuntoMonitoreoModule'
      },
      {
        path: 'punto-monitoreo-obs',
        loadChildren: './monitoreo/punto-monitoreo-obs/punto-monitoreo-obs.module#MonitoreoPuntoMonitoreoObsModule'
      },
      {
        path: 'fotografia-punto',
        loadChildren: './monitoreo/fotografia-punto/fotografia-punto.module#MonitoreoFotografiaPuntoModule'
      },
      {
        path: 'fotografia-monitoreo',
        loadChildren: './monitoreo/fotografia-monitoreo/fotografia-monitoreo.module#MonitoreoFotografiaMonitoreoModule'
      },
      {
        path: 'unidades',
        loadChildren: './monitoreo/unidades/unidades.module#MonitoreoUnidadesModule'
      },
      {
        path: 'resultado',
        loadChildren: './monitoreo/resultado/resultado.module#MonitoreoResultadoModule'
      },
      {
        path: 'resultado-emisiones',
        loadChildren: './monitoreo/resultado-emisiones/resultado-emisiones.module#MonitoreoResultadoEmisionesModule'
      },
      {
        path: 'resultado-metereologia',
        loadChildren: './monitoreo/resultado-metereologia/resultado-metereologia.module#MonitoreoResultadoMetereologiaModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
