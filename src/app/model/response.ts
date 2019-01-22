import {Materia} from './materia';

export class Response {
    materias: Materia[] = [];
    nome_usuario: string;
    faltas_totais: number;
    turma: string;
}
