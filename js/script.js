/*
=========================================
SMART CALCULATOR PRO
Empresa: Smart Solutions

Arquivo: script.js
Versão: 1.0.0
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

const historico = document.getElementById("listaHistorico");

// ===============================
// FUNÇÕES
// ===============================

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

}

function mostrarResultado(valor) {

    resultado.value = valor;

}

// ===============================
// OPERAÇÕES
// ===============================

function somar() {

    const { n1, n2 } = obterValores();

    const total = n1 + n2;

    mostrarResultado(total);

    adicionarHistorico(`${n1} + ${n2} = ${total}`);

}

function subtrair() {

    const { n1, n2 } = obterValores();

    const total = n1 - n2;

    mostrarResultado(total);

    adicionarHistorico(`${n1} - ${n2} = ${total}`);

}

function multiplicar() {

    const { n1, n2 } = obterValores();

    const total = n1 * n2;

    mostrarResultado(total);

    adicionarHistorico(`${n1} × ${n2} = ${total}`);

}

function dividir() {

    const { n1, n2 } = obterValores();

    if (n2 === 0) {

        alert("Não é possível dividir por zero.");

        return;

    }

    const total = n1 / n2;

    mostrarResultado(total);

    adicionarHistorico(`${n1} ÷ ${n2} = ${total}`);

}

function limpar() {

    numero1.value = "";
    numero2.value = "";
    resultado.value = "";

    numero1.focus();

}

// ===============================
// EVENTOS
// ===============================

btnSomar.addEventListener("click", somar);

btnSubtrair.addEventListener("click", subtrair);

btnMultiplicar.addEventListener("click", multiplicar);

btnDividir.addEventListener("click", dividir);

btnLimpar.addEventListener("click", limpar);