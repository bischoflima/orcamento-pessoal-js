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
                
            despesas.push(JSON.parse(localStorage.getItem(i)));
        }
        return despesas;
    }
}