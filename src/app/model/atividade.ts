export class Atividade {
  nome: string;
  tipo: string;
  data: string;
  valor: number;
  nota: number;
  peso: number;
  notaComPeso: number;
  dia: string = null;
  mes: string = null;
  ano: string = null;
  nota_final: any = null;
  valor_final: any = null;
  acima_media: boolean = null;

  constructor(atividade: any) {
    this.nome = atividade._nome.split(':')[1].replace(/^\s+/g, '');
    this.tipo = atividade._nome.split(':')[0];
    this.valor = atividade._valor;
    this.nota = atividade._nota;
    this.data = atividade._data;
    this.peso = atividade._peso;
    this.notaComPeso = this.nota * this.peso;
  }

  getDia() {
      if (this.dia !== null) {
          return this.dia;
      }
    return this.dia = this.data.split('/')[0];
  }

  getMes() {
      if (this.mes !== null) {
         return this.mes;
      }
        return this.mes =  this.data.split('/')[1];
    }

  getAno() {
      if (this.ano !== null) {
          return this.ano;
      }
        return this.ano = this.data.split('/')[2];
    }

    getNota() {
      if (this.nota_final !== null) {
          return this.nota_final;
      }
      if (this.nota === null) {
          return this.nota_final = 'Vazia';
      }

      if (this.nota.toString().includes('.')) {
          if (this.nota.toString().split('.')[1].length > 2) {
              return this.nota_final =  this.nota.toFixed(2);
          }
      }

      return this.nota_final = this.nota;
    }

    getValor() {
      if (this.valor_final !== null) {
          return this.valor_final;
      }
        if (this.valor === null){
            return this.valor_final = 'Não Lançado';
        }
        return this.valor_final = this.valor;
    }

    isAcimaMedia() {
      if (this.acima_media !== null) {
          return this.acima_media;
      }
      return this.acima_media =  this.nota >= (this.valor * 0.6);
    }
}
