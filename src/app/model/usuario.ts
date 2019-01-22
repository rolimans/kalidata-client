import {Atividade} from './atividade';

export class Usuario {
  private _login: string;
  private senha: string;
  nome: string;
  atividades: Atividade[];
  json: string = null;

  constructor(login: string, senha: string, nome: string, atividades: Atividade[]) {
    this._login = login;
    this.senha = senha;
    this.nome = nome;
    this.atividades = atividades;
  }

  getAtividadesJSON(): string {
      if (this.json !== null) {
          return this.json;
      }
    return this.json =  JSON.stringify(this.atividades);
  }
}
