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

    recuperarTodosRegistros(){
        console.log('chegamos aqui já');
    }
}