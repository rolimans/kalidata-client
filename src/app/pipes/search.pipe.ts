import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      const final = value.slice();
    const search = args[0];
    const order = args[1];
    const atividades = args[2];
    const use_peso = args[3];
    if (search === undefined || search === '' || search === null) {
      if (order === 'nome') {
          return final.sort(this.nome_f);
      } else if (order === 'maior') {
          if (atividades) {
              if (use_peso) {
                  return final.sort(this.maior_p);
              }
              return final.sort(this.maior_at);
          }
          return final.sort(this.maior_f);
      } else {
          if (atividades) {
              if (use_peso) {
                  return final.sort(this.menor_p);
              }
              return final.sort(this.menor_at);
          }
          return final.sort(this.menor_f);
      }
    } else {
      const final_search = search.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const res = value.filter((materia) => {
          const nome = materia.nome.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
          return nome.includes(final_search);
      });
      if (res.length === 0 && value.length !== 0) {
          return [-1];
      }
        if (order === 'nome') {
            return res.sort(this.nome_f);
        } else if (order === 'maior') {
            if (atividades) {
                if (use_peso) {
                    return res.sort(this.maior_p);
                }
                return res.sort(this.maior_at);
            }
            return res.sort(this.maior_f);
        } else {
            if (atividades) {
                if (use_peso) {
                    return res.sort(this.menor_p);
                }
                return res.sort(this.menor_at);
            }
            return res.sort(this.menor_f);
        }
    }
  }

    nome_f(a, b) {
        if (a.nome < b.nome) {
            return -1;
        }

        if (a.nome > b.nome) {
            return 1;
        }
        return 0;
    }

    maior_f(a, b) {
        if (a.getNotaTotal() < b.getNotaTotal()) {
            return 1;
        }

        if (a.getNotaTotal() > b.getNotaTotal()) {
            return -1;
        }
        return 0;
    }

    menor_f(a, b) {
        if (a.getNotaTotal() < b.getNotaTotal()) {
            return -1;
        }

        if (a.getNotaTotal() > b.getNotaTotal()) {
            return 1;
        }
        return 0;
    }

    maior_at(a, b) {
        if (a.getNotaTotalAtividades() < b.getNotaTotalAtividades()) {
            return 1;
        }

        if (a.getNotaTotalAtividades() > b.getNotaTotalAtividades()) {
            return -1;
        }
        return 0;
    }

    menor_at(a, b) {
        if (a.getNotaTotalAtividades() < b.getNotaTotalAtividades()) {
            return -1;
        }

        if (a.getNotaTotalAtividades() > b.getNotaTotalAtividades()) {
            return 1;
        }
        return 0;
    }

    maior_p(a, b) {
        if (a.getNotaTotalPeso() < b.getNotaTotalPeso()) {
            return 1;
        }

        if (a.getNotaTotalPeso() > b.getNotaTotalPeso()) {
            return -1;
        }
        return 0;
    }

    menor_p(a, b) {
        if (a.getNotaTotalPeso() < b.getNotaTotalPeso()) {
            return -1;
        }

        if (a.getNotaTotalPeso() > b.getNotaTotalPeso()) {
            return 1;
        }
        return 0;
    }


}
