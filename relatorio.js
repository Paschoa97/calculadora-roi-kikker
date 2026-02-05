/* ================================
   RELATÓRIO EXECUTIVO DE ROI
   KIKKER – JS FINAL
================================ */

const params = new URLSearchParams(window.location.search);

/* ================================
   FUNÇÕES UTILITÁRIAS
================================ */

function numero(valor) {
  if (!valor) return 0;
  return Number(
    valor
      .toString()
      .replace(/\./g, "")
      .replace(",", ".")
  );
}

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* ================================
   CAPTURA DOS DADOS
================================ */

const rede = params.get("rede") || "—";

const faturamentoMensal = numero(params.get("faturamento"));
const margemPercentual = numero(params.get("margem"));
const lojas = numero(params.get("lojas"));
const cds = numero(params.get("cds"));
const itens = numero(params.get("itens"));

const margem = margemPercentual / 100;

/* ================================
   CÁLCULOS BASE
================================ */

// Faturamento e CMV
const faturamentoAnual = faturamentoMensal * 12;
const cmv = faturamentoAnual * (1 - margem);

// ================================
// GANHOS – CENÁRIO CONSERVADOR
// ================================

// Ruptura Comercial
// 10% das vendas afetadas
// 25% recuperável
// 50% redutor conservador
const ganhoComercial =
  faturamentoAnual * 0.10 * 0.25 * margem * 0.5;

// Ruptura Operacional
const ganhoOperacional =
  faturamentoAnual * 0.10 * 0.25 * margem * 0.5;

// Quebras / Desperdício
// 3% do CMV
// 35% mitigável
const ganhoQuebras =
  cmv * 0.03 * 0.35;

// Redução de Estoque
// Média de 4,5 dias de estoque
const vendaDiariaCMV = cmv / 365;
const reducaoDiasEstoque = 4.5;
const ganhoEstoque =
  vendaDiariaCMV * reducaoDiasEstoque;

// ================================
// GANHOS TOTAIS
// ================================

const ganhosTotais =
  ganhoComercial +
  ganhoOperacional +
  ganhoQuebras;

// ================================
// CUSTOS KIKKER
// ================================

const setupPorLoja = 8300;
const mensalidadePorLoja = 1600;

const investimentoInicial = setupPorLoja * lojas;
const custoAnual =
  investimentoInicial +
  (mensalidadePorLoja * lojas * 12);

// ================================
// ROI
// ================================

const roi =
  custoAnual > 0
    ? (ganhosTotais / custoAnual)
    : 0;

/* ================================
   PREENCHIMENTO DO HTML
================================ */

document.getElementById("clienteInfo").innerText =
  `Relatório gerado para a rede: ${rede}`;

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
