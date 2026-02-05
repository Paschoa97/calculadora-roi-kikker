/* ================================
   RELATÓRIO EXECUTIVO DE ROI
   KIKKER – JS FINAL (LOCALSTORAGE)
================================ */

/* ================================
   FUNÇÕES UTILITÁRIAS
================================ */

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* ================================
   CAPTURA DOS DADOS
================================ */

const dados = JSON.parse(localStorage.getItem("roiData"));

if (!dados) {
  alert("Dados não encontrados. Refaça a simulação.");
  window.location.href = "index.html";
}

// Dados base
const faturamentoMensal = dados.faturamento;
const margemPercentual = dados.margem;
const lojas = dados.lojas;
const cds = dados.cds;
const itens = dados.itens;

const margem = margemPercentual / 100;

/* ================================
   CÁLCULOS BASE
================================ */

// Faturamento e CMV
const faturamentoAnual = faturamentoMensal * 12;
const cmv = faturamentoAnual * (1 - margem);

/* ================================
   GANHOS – CENÁRIO CONSERVADOR
================================ */

// Ruptura Comercial
const ganhoComercial =
  faturamentoAnual * 0.10 * 0.25 * margem * 0.5;

// Ruptura Operacional
const ganhoOperacional =
  faturamentoAnual * 0.10 * 0.25 * margem * 0.5;

// Quebras / Desperdício
const ganhoQuebras =
  cmv * 0.03 * 0.35;

// Redução de Estoque (alívio de caixa)
const vendaDiariaCMV = cmv / 365;
const reducaoDiasEstoque = 4.5;
const ganhoEstoque =
  vendaDiariaCMV * reducaoDiasEstoque;

/* ================================
   GANHOS TOTAIS
================================ */

const ganhosTotais =
  ganhoComercial +
  ganhoOperacional +
  ganhoQuebras;

/* ================================
   CUSTOS KIKKER
================================ */

const setupPorLoja = 8300;
const mensalidadePorLoja = 1600;

const investimentoInicial = setupPorLoja * lojas;
const custoAnual =
  investimentoInicial +
  (mensalidadePorLoja * lojas * 12);

/* ================================
   ROI
================================ */

const roi =
  custoAnual > 0
    ? ganhosTotais / custoAnual
    : 0;

/* ================================
   PREENCHIMENTO DO HTML
================================ */

document.getElementById("fatAnual").innerText =
  moeda(faturamentoAnual);

document.getElementById("margem").innerText =
  `${margemPercentual}%`;

document.getElementById("lojas").innerText =
  lojas;

document.getElementById("cds").innerText =
  cds;

document.getElementById("itens").innerText =
  itens.toLocaleString("pt-BR");

document.getElementById("ganhoComercial").innerText =
  moeda(ganhoComercial);

document.getElementById("ganhoOperacional").innerText =
  moeda(ganhoOperacional);

document.getElementById("ganhoQuebras").innerText =
  moeda(ganhoQuebras);

document.getElementById("ganhoEstoque").innerText =
  moeda(ganhoEstoque);

document.getElementById("roiFinal").innerText =
  `${roi.toFixed(2)}x`;

document.getElementById("alivioCaixa").innerText =
  `Alívio de Caixa estimado: ${moeda(ganhoEstoque)}`;
