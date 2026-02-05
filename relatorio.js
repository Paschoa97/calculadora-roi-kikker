const dados = JSON.parse(localStorage.getItem("roiData"));

if (!dados) {
  alert("Dados não encontrados. Volte e realize a simulação.");
  window.location.href = "index.html";
}

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Dados base
const faturamentoMensal = dados.faturamento;
const margem = dados.margem / 100;
const lojas = dados.lojas;
const cds = dados.cds;
const itens = dados.itens;

// Cálculos
const faturamentoAnual = faturamentoMensal * 12;
const cmv = faturamentoAnual * (1 - margem);

// Ganhos (modelo conservador)
const ganhoComercial = faturamentoAnual * 0.10 * 0.25 * margem * 0.5;
const ganhoOperacional = ganhoComercial;
const ganhoQuebras = cmv * 0.03 * 0.35;

// Estoque
const vendaDiaCMV = cmv / 365;
const reducaoDias = 4.5;
const ganhoEstoque = vendaDiaCMV * reducaoDias;

// Custos
const investimentoInicial = 8300 * lojas;
const mensalidade = 1600 * lojas;
const custoAnual = investimentoInicial + (mensalidade * 12);

// ROI
const ganhosTotais = ganhoComercial + ganhoOperacional + ganhoQuebras;
const roi = (ganhosTotais / custoAnual).toFixed(2);

// Render
document.getElementById("redeNome").innerText =
  "Relatório gerado para a rede analisada";

document.getElementById("fatAnual").innerText = moeda(faturamentoAnual);
document.getElementById("margem").innerText = (dados.margem) + "%";
document.getElementById("lojas").innerText = lojas;
document.getElementById("cds").innerText = cds;
document.getElementById("itens").innerText = itens.toLocaleString("pt-BR");

document.getElementById("ganhoComercial").innerText = moeda(ganhoComercial);
document.getElementById("ganhoOperacional").innerText = moeda(ganhoOperacional);
document.getElementById("ganhoQuebras").innerText = moeda(ganhoQuebras);
document.getElementById("ganhoEstoque").innerText = moeda(ganhoEstoque);

document.getElementById("roiFinal").innerText = roi + "x";
document.getElementById("alivioCaixa").innerText =
  "Alívio de Caixa estimado: " + moeda(ganhoEstoque);
