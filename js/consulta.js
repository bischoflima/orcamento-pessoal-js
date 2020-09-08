let dataAtual = new Date();
document.querySelector(".anoAtual").innerHTML = `${dataAtual.getFullYear()}`;

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

function carregaListaDespesas() {
    let registros = bd.recuperarTodosRegistros();
    let tabela = document.querySelector(".tabela");

    for (let i in registros) {
        let data = `${registros[i]._dia} de ${registros[i]._mes} de ${registros[i]._ano}`;
        let texto = `<tr>`
        texto += `<td>${data}</td>`
        texto += `<td>${registros[i]._tipo}</td>`
        texto += `<td>${registros[i]._descricao}</td>`
        texto += `<td>${registros[i]._valor}</td>`
        texto += `</tr>`

        tabela.innerHTML += texto;
        
    }
}

document.addEventListener('load', carregaListaDespesas());