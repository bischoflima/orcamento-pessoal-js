class BD {

    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(despesa) {
        let id = this.getProximoId();
        localStorage.setItem('id', id);
        localStorage.setItem(id, JSON.stringify(despesa));
    }

    recuperarTodosRegistros() {
        let qtdRegistros = parseInt(localStorage.getItem('id'));
        let despesas = [];

        for (let i = 1; i <= qtdRegistros; i++) {
            if (localStorage.getItem(i) === null)
                continue;
            let despesa = JSON.parse(localStorage.getItem(i));
            despesa.id = i;
            despesas.push(despesa);
        }
        return despesas;
    }

    removerRegistro(id = undefined){
        if(id){
            localStorage.removeItem(`${id}`);
        }
    }

    pesquisar(despesa) {

        let despesasFiltradas = this.recuperarTodosRegistros();
        // filter de ano, mes, dia, tipo, descricao, valor

        if(despesa._ano != ''){
            despesasFiltradas = despesasFiltradas.filter((d) => { return d._ano == despesa._ano });
        }

        if(despesa._dia != ''){
            despesasFiltradas = despesasFiltradas.filter((d) => { return d._dia == despesa._dia });
        }

        if(despesa._mes != ''){
            despesasFiltradas = despesasFiltradas.filter((d) => { return d._mes == despesa._mes });
        }

        if(despesa._tipo != ''){
            despesasFiltradas = despesasFiltradas.filter((d) => { return d._tipo == despesa._tipo })
        }

        if (despesa._valor != ''){
            despesasFiltradas = despesasFiltradas.filter((d) => { return d._valor == despesa._valor });
        }

        if (despesa._descricao != ''){
            despesasFiltradas = despesasFiltradas.filter((d) => { return d._descricao == despesa._descricao })
        }
        

        return despesasFiltradas;
    }
}