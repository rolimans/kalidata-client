import {Atividade} from './atividade';

export class Bimestre {
  nome: string;
  nota: number;
  faltas: number;
  atividades: Atividade[];
  empty: boolean = null;
  true_nota: number = null;
  true_nota_peso: number = null;
  valor_bimestre: number = null;
  aprovado: boolean = null;
  ultima_atividade: Atividade = null;

  constructor(bimestre: any) {
    this.atividades = [];
    this.nome = bimestre._nome;
    this.nota = bimestre._nota;
    this.faltas = bimestre._faltas;
    bimestre._atividades.forEach(
      (atividade) =>{
        this.addAtividade(new Atividade(atividade));
      }
    );
  }

  addAtividade(atividade: Atividade) {
    this.atividades.push(atividade);
    // Only used at constructor in this case
  }

  isEmpty(): boolean {
      if (this.empty !== null) {
         return this.empty;
      }
    return this.empty = !this.atividades.length;
  }

  getTrueNota() {
      if (this.true_nota !== null) {
          return this.true_nota;
      }

      if (this.atividades.length === 0) {
        return this.true_nota = this.nota;
      }

      let x = 0;

      this.atividades.forEach((atividade) => {
          if (!isNaN(atividade.nota)) {
              x += atividade.nota;
          }
      });

      return this.true_nota = x;
  }

  getTrueNotaPeso(){
      if (this.true_nota_peso !== null) {
          return this.true_nota_peso;
      }

      if (this.atividades.length === 0) {
          return this.true_nota_peso = this.nota;
      }

      let x = 0;

      this.atividades.forEach((atividade) => {
          if (!isNaN(atividade.notaComPeso)) {
              x += atividade.notaComPeso;
          }
      });

      return this.true_nota_peso = x;
  }

  getUltimaAtividade() {
      if (this.ultima_atividade !== null) {
          return this.ultima_atividade;
      }
      let ultima: any = false;

      this.atividades.forEach((atividade) => {
          if (atividade.nota !== null) {
              ultima = atividade;
          }
      });

      return this.ultima_atividade = ultima;
  }

  getValueBimestre() {
      if (this.valor_bimestre !== null) {
          return this.valor_bimestre;
      }

      let nota;

      if (this.nome.includes('1') || this.nome.includes('3')){
          nota = 20;
      } else {
          nota = 30;
      }
      return this.valor_bimestre = nota;
  }

  isAprovado() {
      if (this.aprovado !== null) {
          return this.aprovado;
      }

      return this.aprovado = this.nota >= (this.getValueBimestre() * 0.6);
  }

  getAtividadesRevesed() {
      return this.atividades.slice().reverse();
  }
}
