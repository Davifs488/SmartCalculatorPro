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
const btnTema = document.getElementById("btnTema");
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

function adicionarHistorico(operacao){


    const agora = new Date();


    const registro = {

        data:
        agora.toLocaleDateString("pt-BR")
        +" "
        +
        agora.toLocaleTimeString("pt-BR"),


        operacao:operacao

    };


    listaOperacoes.unshift(registro);



    if(listaOperacoes.length > 20){

        listaOperacoes.pop();

    }



    salvarHistorico();


    carregarHistorico();


}

function removerHistorico(index){


    listaOperacoes.splice(index,1);


    salvarHistorico();


    carregarHistorico();


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

let listaOperacoes = JSON.parse(
    localStorage.getItem("historicoCalculadora")
) || [];



function salvarHistorico(){

    localStorage.setItem(
        "historicoCalculadora",
        JSON.stringify(listaOperacoes)
    );

}



function carregarHistorico(){

    historico.innerHTML = "";


    if(listaOperacoes.length === 0){

        historico.innerHTML =
        "<p>Nenhuma operação realizada.</p>";

        return;

    }


    listaOperacoes.forEach((item,index)=>{

        criarItemHistorico(item,index);

    });

}
function criarItemHistorico(item,index){


    const div = document.createElement("div");

    div.classList.add("itemHistorico");


    div.innerHTML = `

        <strong>${item.data}</strong><br>

        ${item.operacao}

        <br><br>

        <button onclick="removerHistorico(${index})">
            🗑 Excluir
        </button>

    `;


    historico.appendChild(div);


}

function limparHistorico(){

    listaOperacoes = [];

    localStorage.removeItem(
        "historicoCalculadora"
    );

    carregarHistorico();

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
    //////////
    // ===============================
// TEMA ESCURO
// ===============================


function carregarTema(){


    const tema =
    localStorage.getItem("tema");


    if(tema === "dark"){

        document.body.classList.add("dark");

        btnTema.innerHTML =
        "☀️ Modo Claro";

    }


}



function alterarTema(){


    document.body.classList.toggle("dark");


    if(document.body.classList.contains("dark")){


        localStorage.setItem(
            "tema",
            "dark"
        );


        btnTema.innerHTML =
        "☀️ Modo Claro";


    }else{


        localStorage.setItem(
            "tema",
            "light"
        );


        btnTema.innerHTML =
        "🌙 Modo Escuro";


    }


}



btnTema.addEventListener(
    "click",
    alterarTema
);


carregarTema();


});