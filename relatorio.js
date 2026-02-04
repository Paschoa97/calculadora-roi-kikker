// ====== LER PARÂMETROS DA URL (vindos do RD Station) ======
const params = new URLSearchParams(window.location.search);

let nome = params.get("nome");
let email = params.get("email");
let telefone = params.get("telefone");
let rede = params.get("rede");

let faturamentoMensal = Number(params.get("faturamento"));
let margem = Number(params.get("margem")) / 100;
let lojas = Number(params.get("lojas"));
let cds = Number(params.get("cds"));
let itens = Number(params.get("itens"));

// ====== FUNÇÃO MOEDA ======
function moeda(valor){
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ====== CÁLCULOS ======
let faturamentoAnual = faturamentoMensal * 12;
let cmv = faturamentoAnual - (faturamentoAnual * margem);

// Rupturas
let ganhoComercial = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;
let ganhoOperacional = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;

// Quebras / desperdício
let ganhoQuebras = (cmv * 0.03) * 0.35;

// Estoques
let vendaDia = faturamentoAnual / 365;
let vendaDiaCMV = vendaDia - (vendaDia * margem);
let reducaoDias = (3 + 6) / 2;
let ganhoEstoque = vendaDiaCMV * reducaoDias;

// Ganhos totais
let ganhosTotais = ganhoComercial + ganhoOperacional + ganhoQuebras;

// Custos Kikker
let investimentoInicial = 8300 * lojas;
let mensalidade = 1600 * lojas;
let custoAnual = (mensalidade * 12) + investimentoInicial;

// ROI
let roi = (ganhosTotais / custoAnual).toFixed(2);

// Alívio de caixa
let alivioCaixa = ganhoEstoque;

// ====== PREENCHER RELATÓRIO ======
document.getElementById("clienteInfo").innerText =
  `Cliente: ${nome} | Rede: ${rede} | Email: ${email}`;

document.getElementById("fatAnual").innerText = moeda(faturamentoAnual);
document.getElementById("margem").innerText = (margem * 100) + "%";
document.getElementById("lojas").innerText = lojas;
document.getElementById("cds").innerText = cds;
document.getElementById("itens").innerText = itens;

document.getElementById("ganhoComercial").innerText = moeda(ganhoComercial);
document.getElementById("ganhoOperacional").innerText = moeda(ganhoOperacional);
document.getElementById("ganhoQuebras").innerText = moeda(ganhoQuebras);
document.getElementById("ganhoEstoque").innerText = moeda(ganhoEstoque);

document.getElementById("roiFinal").innerText = roi + "x";
document.getElementById("alivioCaixa").innerText =
  "Alívio de Caixa: " + moeda(alivioCaixa);
