class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this._ano = ano;
        this._mes = mes;
        this._dia = dia;
        this._tipo = tipo;
        this._descricao = descricao;
        this._valor = valor;
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == null || this[i] == '') return false;
        }
        return true;
    }
}