let dataAtual = new Date();
document.querySelector(".anoAtual").innerHTML = `${dataAtual.getFullYear()}`;

$(document).ready(function () {
    $('.modalSucesso').modal();
});

function insereAnos() {
    let anos = document.querySelector(".anos");

    for (let i = 0; i < 3; i++) {
        let ano = dataAtual.getFullYear() + i;
        anos.innerHTML += `<option class="blue-text text-darken-2" value="${ano}" >${ano}</option>`;
    }
}
$(document).ready(function () {
    $('select').formSelect();
});
insereAnos();

function isBissexto() {
    let anoAtual = dataAtual.getFullYear();

    if (((anoAtual % 4) % 1 === 0) && ((anoAtual % 100 != 0 || (anoAtual % 400 === 0)))) {
        return true;
    } else {
        return false;
    }
}

document.querySelector("#dia").addEventListener("click", function () {
    let mes = document.querySelector(".mes").options[document.querySelector(".mes").selectedIndex].value;

    if (mes == 1) {
        if (isBissexto()) {
            document.getElementById("dia").max = "29";
        } else {
            document.getElementById("dia").max = "28";
        }
    } else {
        document.getElementById("dia").max = "31";
    }
});


// inicio da codificação

let bd = new BD();

function carregaListaDespesas(registros = []) {
    let tabela = document.querySelector(".tabela");
    tabela.innerHTML = '';

    if (registros.length == 0)
        registros = bd.recuperarTodosRegistros();

    for (let i in registros) {
        let data = `${registros[i]._dia} de ${registros[i]._mes} de ${registros[i]._ano}`;
        let texto = `<tr class="s10">`
        texto += `<td>${data}</td>`
        texto += `<td>${registros[i]._tipo}</td>`
        texto += `<td>${registros[i]._descricao}</td>`
        texto += `<td>${registros[i]._valor}</td>`
        texto += `<td><div class="waves-effect waves-red btn white" onclick="removeDespesa(${registros[i].id})"><i class="material-icons red-text text-lighten-1  delete ">delete</i></td>`
        texto += `</tr>`

        tabela.innerHTML += texto;

    }
}

function removeDespesa(id){
    bd.removerRegistro(id);
    M.Modal.getInstance($('#modalSucesso')).open();
    carregaListaDespesas();
}

function pesquisarDespesa() {

    let ano = document.querySelector(".anos");
    let mes = document.querySelector(".mes");
    let dia = document.querySelector("#dia");
    let tipo = document.querySelector(".tipo");
    let descricao = document.querySelector("#descricao");
    let valor = document.querySelector("#valor");

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

    carregaListaDespesas(bd.pesquisar(despesa));
    ano.value = '';
    mes.value = '';
    dia.value = '';
    tipo.value = '';
    descricao.value = '';
    valor.value = '';

}

document.addEventListener('load', carregaListaDespesas(bd.recuperarTodosRegistros()));

document.querySelector('#pesquisar').addEventListener('click', pesquisarDespesa);