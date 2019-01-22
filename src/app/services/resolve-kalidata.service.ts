import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {KalidataService} from './kalidata.service';
import { Response} from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class ResolveKalidataService implements Resolve<any>{

  constructor(private kalidataService: KalidataService) { }

  resolve() {
      const response: Response = new Response();

      if (this.kalidataService.response == null) {
          this.kalidataService.subjectResponse$.subscribe(
              (result) => {
                  response.nome_usuario = result.nome_usuario;
                  response.faltas_totais = result.faltas_totais;
                  response.materias = result.materias;
                  response.turma = result.turma;
              }
          );
      } else {
          response.nome_usuario = this.kalidataService.response.nome_usuario;
          response.faltas_totais = this.kalidataService.response.faltas_totais;
          response.materias = this.kalidataService.response.materias;
          response.turma = this.kalidataService.response.turma;
      }

      return response;
  }
}
