let dataAtual = new Date();
document.querySelector(".anoAtual").innerHTML = `${dataAtual.getFullYear()}`;

$(document).ready(function () {
    $('.modalErro').modal();
});
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

// inicio do cadastro de despesas

// buscar ids/class .anos .mes, #dia, .tipo, #descricao, #valor, .adicionar

function cadastrarDespesa() {
    let ano = document.querySelector(".anos");
    let mes = document.querySelector(".mes");
    let dia = document.querySelector("#dia");
    let tipo = document.querySelector(".tipo");
    let descricao = document.querySelector("#descricao");
    let valor = document.querySelector("#valor");

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

    if (despesa.validarDados()) {
        let bd = new BD();
        bd.gravar(despesa);
        let modal = M.Modal.getInstance($('.modalSucesso'));
        modal.open();
    } else {
        let modal = M.Modal.getInstance($('.modalErro'));
        modal.open();
        
    }
}

document.querySelector(".adicionar").addEventListener("click", cadastrarDespesa);

