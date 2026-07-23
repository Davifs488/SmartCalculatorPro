/*
=========================================
SMART CALCULATOR PRO
Empresa: Smart Solutions

Arquivo: script.js
Versão: 1.1.0
Autor: Davi F. Silva
=========================================
*/
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
const btnTema = document.getElementById("btnTema");
const pesquisarHistorico = document.getElementById("pesquisarHistorico");

// ===============================
// DASHBOARD
// ===============================

const totalCalculos = document.getElementById("totalCalculos");
const operacaoMaisUsada = document.getElementById("operacaoMaisUsada");
const ultimoCalculo = document.getElementById("ultimoCalculo");

// ===============================
// HISTÓRICO - INICIALIZAR
// ===============================

let listaOperacoes = JSON.parse(
    localStorage.getItem("historicoCalculadora")
) || [];

// ===============================
// FUNÇÕES
// ===============================

function copiarResultado(){
    if(resultado.value === ""){
        alert("Não existe resultado para copiar.");
        return;
    }

navigator.clipboard.writeText(resultado.value)
.then(() => {

    alert("Resultado copiado com sucesso!");

})
.catch(() => {

    alert("Não foi possível copiar.");

});

}

function obterValores() {
    const n1 = Number(numero1.value);
    const n2 = Number(numero2.value);
    return { n1, n2 };
}

function adicionarHistorico(operacao){
    const agora = new Date();

    const registro = {
        id: Date.now(),
        data: agora.toLocaleDateString("pt-BR") + " " + agora.toLocaleTimeString("pt-BR"),
        operacao: operacao
    };

    listaOperacoes.unshift(registro);

    if(listaOperacoes.length > 20){
        listaOperacoes.pop();
    }

    salvarHistorico();
    carregarHistorico();
    atualizarDashboard();
}

function removerHistorico(id){
    listaOperacoes = listaOperacoes.filter(item => item.id !== id);
    salvarHistorico();
    carregarHistorico(pesquisarHistorico.value);
    atualizarDashboard();
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

function salvarHistorico(){
    localStorage.setItem(
        "historicoCalculadora",
        JSON.stringify(listaOperacoes)
    );
}

function carregarHistorico(filtro = "") {

    historico.innerHTML = "";

    let registrosFiltrados = listaOperacoes;

    if (filtro) {

        registrosFiltrados = listaOperacoes.filter(item =>
            item.operacao.toLowerCase().includes(filtro.toLowerCase())
        );

    }

    if (registrosFiltrados.length === 0) {

        historico.innerHTML =
            "<p>Nenhuma operação encontrada.</p>";

        return;

    }

    registrosFiltrados.forEach(item => {

        criarItemHistorico(item);

    });

}

function criarItemHistorico(item){
    const div = document.createElement("div");
    div.classList.add("itemHistorico");

    div.innerHTML = `
        <strong>${item.data}</strong><br>
        ${item.operacao}
        <br><br>
        <button onclick="removerHistorico(${item.id})">
            🗑 Excluir
        </button>
    `;

    historico.appendChild(div);
}

function limparHistorico(){
    listaOperacoes = [];
    localStorage.removeItem("historicoCalculadora");
    carregarHistorico();
    atualizarDashboard();
}

// ===============================
// DASHBOARD
// ===============================

function atualizarDashboard() {
    totalCalculos.textContent = listaOperacoes.length;

    if (listaOperacoes.length === 0) {
        operacaoMaisUsada.textContent = "Nenhuma";
        ultimoCalculo.textContent = "Nenhum";
        return;
    }

    // Último cálculo
    ultimoCalculo.textContent = listaOperacoes[0].operacao;

    let soma = 0;
    let sub = 0;
    let mult = 0;
    let div = 0;

    listaOperacoes.forEach(item => {
        if (item.operacao.includes("+")) soma++;
        else if (item.operacao.includes("-")) sub++;
        else if (item.operacao.includes("×")) mult++;
        else if (item.operacao.includes("÷")) div++;
    });

    const estatisticas = [
        { nome: "➕ Soma", total: soma },
        { nome: "➖ Subtração", total: sub },
        { nome: "✖ Multiplicação", total: mult },
        { nome: "➗ Divisão", total: div }
    ];

estatisticas.sort((a,b)=>b.total-a.total);

if(estatisticas[0].total === 0){

    operacaoMaisUsada.textContent = "Nenhuma";

}else{

    operacaoMaisUsada.textContent =
    estatisticas[0].nome;

}

}

// ===============================
// TEMA ESCURO
// ===============================

function carregarTema(){
    const tema = localStorage.getItem("tema");

    if(tema === "dark"){
        document.body.classList.add("dark");
        btnTema.innerHTML = "☀️ Modo Claro";
    }
}

function alterarTema(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("tema", "dark");
        btnTema.innerHTML = "☀️ Modo Claro";
    } else {
        localStorage.setItem("tema", "light");
        btnTema.innerHTML = "🌙 Modo Escuro";
    }
}

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
btnTema.addEventListener("click", alterarTema);

pesquisarHistorico.addEventListener("input", function () {
    carregarHistorico(this.value);
});

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
        event.preventDefault();
        dividir();
    }
});

// Inicializar
carregarTema();
carregarHistorico();
atualizarDashboard();


// ===============================
// SERVICE WORKER
// ===============================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")

            .then(() => {

                console.log("Service Worker registrado com sucesso.");

            })

            .catch((erro) => {

                console.log("Erro ao registrar:", erro);

            });

    });

}