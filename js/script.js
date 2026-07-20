/*
=========================================
SMART CALCULATOR PRO
Empresa: Smart Solutions

Arquivo: script.js
Versão: 1.1.0
Autor: Davi F. Silva
=========================================
*/

// ===============================
// CAPTURA DOS ELEMENTOS
// ===============================

const numero1 = document.getElementById("numero1");
const numero2 = document.getElementById("numero2");
const resultado = document.getElementById("resultado");

const btnSomar = document.getElementById("somar");
const btnSubtrair = document.getElementById("subtrair");
const btnMultiplicar = document.getElementById("multiplicar");
const btnDividir = document.getElementById("dividir");
const btnLimpar = document.getElementById("limpar");
const btnCopiar = document.getElementById("copiar");
const historico = document.getElementById("listaHistorico");
const btnLimparHistorico = document.getElementById("btnLimparHistorico");

// ===============================
// FUNÇÕES
// ===============================

function copiarResultado(){

    if(resultado.value === ""){

        alert("Não existe resultado para copiar.");

        return;

    }


    navigator.clipboard.writeText(resultado.value);


    alert("Resultado copiado com sucesso!");

}

function obterValores() {

    const n1 = Number(numero1.value);
    const n2 = Number(numero2.value);

    return { n1, n2 };

}

function adicionarHistorico(operacao) {

    const agora = new Date();

    const data = agora.toLocaleDateString("pt-BR");

    const hora = agora.toLocaleTimeString("pt-BR");

    const item = document.createElement("div");

    item.classList.add("itemHistorico");

    item.innerHTML = `
        <strong>${data} ${hora}</strong><br>
        ${operacao}
        <hr>
    `;

    historico.prepend(item);

    // Remove a mensagem de "nenhuma operação"
    const mensagem = historico.querySelector("p");
    if (mensagem) {
        mensagem.remove();
    }

    salvarHistorico();

}

function mostrarResultado(valor) {

    resultado.value = valor;

}

// ===============================
// OPERAÇÕES
// ===============================

function somar() {

    const { n1, n2 } = obterValores();

    if (numero1.value === "" || numero2.value === "") {
        resultado.value = "Digite os números!";
        return;
    }

    const total = n1 + n2;

    mostrarResultado(total);

    adicionarHistorico(`${n1} + ${n2} = ${total}`);

}

function subtrair() {

    const { n1, n2 } = obterValores();

    if (numero1.value === "" || numero2.value === "") {
        resultado.value = "Digite os números!";
        return;
    }

    const total = n1 - n2;

    mostrarResultado(total);

    adicionarHistorico(`${n1} - ${n2} = ${total}`);

}

function multiplicar() {

    const { n1, n2 } = obterValores();

    if (numero1.value === "" || numero2.value === "") {
        resultado.value = "Digite os números!";
        return;
    }

    const total = n1 * n2;

    mostrarResultado(total);

    adicionarHistorico(`${n1} × ${n2} = ${total}`);

}

function dividir() {

    const { n1, n2 } = obterValores();

    if (numero1.value === "" || numero2.value === "") {
        resultado.value = "Digite os números!";
        return;
    }

    if (n2 === 0) {

        resultado.value = "Erro: Divisão por zero";

        return;

    }

    const total = n1 / n2;

    mostrarResultado(total);

    adicionarHistorico(`${n1} ÷ ${n2} = ${total.toFixed(5)}`);

}

function limpar() {

    numero1.value = "";
    numero2.value = "";
    resultado.value = "";

    numero1.focus();

}

// ===============================
// HISTÓRICO
// ===============================

function salvarHistorico() {

    localStorage.setItem(
        "historicoCalculadora",
        historico.innerHTML
    );

}

function carregarHistorico() {

    const dados = localStorage.getItem("historicoCalculadora");

    if (dados) {

        historico.innerHTML = dados;

    }

}

function limparHistorico() {

    historico.innerHTML = "<p>Nenhuma operação realizada.</p>";

    localStorage.removeItem("historicoCalculadora");

}

carregarHistorico();

// ===============================
// EVENTOS
// ===============================

btnSomar.addEventListener("click", somar);

btnSubtrair.addEventListener("click", subtrair);

btnMultiplicar.addEventListener("click", multiplicar);

btnDividir.addEventListener("click", dividir);

btnLimpar.addEventListener("click", limpar);

btnLimparHistorico.addEventListener("click", limparHistorico);

btnCopiar.addEventListener("click", copiarResultado);

document.addEventListener("keydown", function(event){


    if(event.key === "Enter"){

        somar();

    }


    if(event.key === "+"){

        somar();

    }


    if(event.key === "-"){

        subtrair();

    }


    if(event.key === "*"){

        multiplicar();

    }


    if(event.key === "/"){

        dividir();

    }


});