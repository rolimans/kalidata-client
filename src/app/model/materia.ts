import {Bimestre} from './bimestre';
import {Atividade} from './atividade';

export class Materia {
  bimestres: Bimestre[];
  nome: string;
  total_faltas: number;
  nota_total: number = null;
  empty: boolean = null;
  nota_falta: number = null;
  aprovado: boolean = null;
  ultima_atividade: Atividade = null;
  total_bimestres: number = null;
  bimestres_nao_vazios: Bimestre[] = null;
  total_atividades: number = null;
  total_bimestres_nota: number = null;
    bimestres_com_nota: Bimestre[] = null;
    nota_total_atividades: number = null;
    nota_total_peso: number = null;
    nota_falta_atividade: number = null;
    nota_falta_peso: number = null;
    aprovado_atividades: boolean = null;
    aprovado_peso: boolean = null;

  constructor(materia: any) {
    this.nome = materia._nome;
    this.total_faltas = materia._total_faltas;
    this.bimestres = [];
    this.addBimestre(new Bimestre(materia._bimestre[0]));
    this.addBimestre(new Bimestre(materia._bimestre[1]));
    this.addBimestre(new Bimestre(materia._bimestre[2]));
    this.addBimestre(new Bimestre(materia._bimestre[3]));
    if (materia._bimestre.length === 5) {
        this.addBimestre(new Bimestre(materia._bimestre[4]));
    }
  }

  getCertainBimestre(x: number) {
    return this.bimestres[x - 1];
  }

  addBimestre(bimestre: Bimestre) {
    this.bimestres.push(bimestre);
    // Used only on constructor in this case
  }

  getNotaTotal() {
      if (this.nota_total !== null) {
          return this.nota_total;
      }
    let aux = 0;

      for (let i = 0; i < 4; i++) {
          if (this.getCertainBimestre(i + 1).nota !== null) {
              aux += this.getCertainBimestre(i + 1).nota;
          }
      }

    return this.nota_total = Math.round(aux);
  }

    getNotaTotalAtividades() {
        if (this.nota_total_atividades !== null) {
            return this.nota_total_atividades;
        }
        let aux = 0;

        this.bimestres.forEach(
            function (item) {
                aux += item.getTrueNota();
            }
        );

        return this.nota_total_atividades = Math.round(aux);
    }

    getNotaTotalPeso() {
        if (this.nota_total_peso !== null) {
            return this.nota_total_peso;
        }
        let aux = 0;

        this.bimestres.forEach(
            function (item) {
                aux += item.getTrueNotaPeso();
            }
        );

        return this.nota_total_peso = Math.round(aux);
    }

  isEmpty(): boolean {
      if (this.empty !== null) {
          return this.empty;
      }
      if (this.bimestres.length === 5) {
          return this.empty =  this.getCertainBimestre(1).isEmpty() && this.getCertainBimestre(2).isEmpty() && this.getCertainBimestre(3).isEmpty() && this.getCertainBimestre(4).isEmpty() && this.getCertainBimestre(5).isEmpty();
      }
    return this.empty =  this.getCertainBimestre(1).isEmpty() && this.getCertainBimestre(2).isEmpty() && this.getCertainBimestre(3).isEmpty() && this.getCertainBimestre(4).isEmpty();
  }

  getNotaFalta() {
      if (this.nota_falta !== null) {
          return this.nota_falta;
      }
    return this.nota_falta =  Math.abs( 60 - this.getNotaTotal());
  }

  getNotaFaltaAtividades() {
      if (this.nota_falta_atividade !== null) {
          return this.nota_falta_atividade;
      }
      return this.nota_falta_atividade =  Math.abs( 60 - this.getNotaTotalAtividades());
  }

    getNotaFaltaPeso() {
        if (this.nota_falta_peso !== null) {
            return this.nota_falta_peso;
        }
        return this.nota_falta_peso =  Math.abs( 60 - this.getNotaTotalPeso());
    }

  isAprovado(): boolean {
      if (this.aprovado !== null) {
          return this.aprovado;
      }
      return this.aprovado = this.getNotaTotal() >= 60;
  }

    isAprovadoAtividades(): boolean {
        if (this.aprovado_atividades !== null) {
            return this.aprovado_atividades;
        }
        return this.aprovado_atividades = this.getNotaTotalAtividades() >= 60;
    }

    isAprovadoPeso(): boolean {
        if (this.aprovado_peso !== null) {
            return this.aprovado_peso;
        }
        return this.aprovado_peso = this.getNotaTotalPeso() >= 60;
    }

  getUltimaAtividade() {
      if (this.ultima_atividade !== null) {
          return this.ultima_atividade;
      }
      let ultima: any = false;
      let aux;

      for (let i = 0; i < this.bimestres.length; i++) {
          aux = this.getCertainBimestre(i + 1).getUltimaAtividade();
          if (aux !== false) {
              ultima = aux;
          }
      }
      return this.ultima_atividade = ultima;
  }
  getTotalBimestres() {
      if (this.total_bimestres !== null) {
          return this.total_bimestres;
      }
      let i = 0;

      this.bimestres.forEach(
          (bimestre) => {
              if (bimestre.atividades.length !== 0) {
                  i++;
              }
          }
      );

      return this.total_bimestres = i;
  }

  getTotalBimestresNota() {
      if (this.total_bimestres_nota !== null) {
          return this.total_bimestres_nota;
      }

      let i = 0;

      this.bimestres.forEach(
          (bimestre) => {
              if (bimestre.nota !== null) {
                  i++;
              }
          }
      );

      return this.total_bimestres_nota = i;
  }

  getBimestresComNota() {
        if (this.bimestres_com_nota !== null) {
            return this.bimestres_com_nota;
        }
        const aux = [];
        for (let i = this.bimestres.length; i >= 1; i--) {
            if (this.getCertainBimestre(i).nota !== null) {
                aux.push(this.getCertainBimestre(i));
            }
        }

        return this.bimestres_com_nota = aux;
    }

  getBimestresNaoVazios() {
      if (this.bimestres_nao_vazios !== null) {
          return this.bimestres_nao_vazios;
      }
      const aux = [];
      for (let i = this.bimestres.length; i >= 1; i--) {
          if (this.getCertainBimestre(i).atividades.length !== 0 ) {
              aux.push(this.getCertainBimestre(i));
          }
      }

      return this.bimestres_nao_vazios = aux;
  }

  getTotalAtividades() {
      if (this.total_atividades !== null) {
          return this.total_atividades;
      }

      if (this.bimestres.length === 5) {
          return this.total_atividades =  this.getCertainBimestre(1).atividades.length + this.getCertainBimestre(2).atividades.length + this.getCertainBimestre(3).atividades.length + this.getCertainBimestre(4).atividades.length + this.getCertainBimestre(5).atividades.length;
      }

      return this.total_atividades =  this.getCertainBimestre(1).atividades.length + this.getCertainBimestre(2).atividades.length + this.getCertainBimestre(3).atividades.length + this.getCertainBimestre(4).atividades.length;
  }

}
