const params = new URLSearchParams(window.location.search);

// -------- Função segura para números (RD Station) --------
function parseNumero(valor) {
  if (!valor) return 0;
  return parseFloat(
    valor
      .toString()
      .replace(/\./g, "")
      .replace(",", ".")
  );
}

// -------- Leitura dos parâmetros --------
let rede = params.get("rede") || "Rede não informada";
let faturamentoMensal = parseNumero(params.get("faturamento"));
let margem = parseNumero(params.get("margem")) / 100;
let lojas = parseNumero(params.get("lojas"));
let cds = parseNumero(params.get("cds"));
let itens = parseNumero(params.get("itens"));

// -------- Função moeda --------
function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// -------- Cálculos --------
let faturamentoAnual = faturamentoMensal * 12;
let cmv = faturamentoAnual - (faturamentoAnual * margem);

// Rupturas
let ganhoComercial = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;
let ganhoOperacional = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;
let ganhoQuebras = (cmv * 0.03) * 0.35;

// Estoques
let vendaDia = faturamentoAnual / 365;
let vendaDiaCMV = vendaDia - (vendaDia * margem);
let reducaoDias = (3 + 6) / 2;
let ganhoEstoque = vendaDiaCMV * reducaoDias;

// Custos Kikker
let investimentoInicial = 8300 * lojas;
let mensalidade = 1600 * lojas;
let custoAnual = (mensalidade * 12) + investimentoInicial;

// ROI
let ganhosTotais = ganhoComercial + ganhoOperacional + ganhoQuebras;
let roi = custoAnual > 0 ? (ganhosTotais / custoAnual).toFixed(2) : "0.00";

// -------- Preenchimento do HTML --------
document.getElementById("clienteInfo").innerText =
  `Relatório gerado para a rede: ${rede}`;

document.getElementById("fatAnual").innerText = moeda(faturamentoAnual);
document.getElementById("margem").innerText = (margem * 100).toFixed(1) + "%";
document.getElementById("lojas").innerText = lojas;
document.getElementById("cds").innerText = cds;
document.getElementById("itens").innerText = itens;

document.getElementById("ganhoComercial").innerText = moeda(ganhoComercial);
document.getElementById("ganhoOperacional").innerText = moeda(ganhoOperacional);
document.getElementById("ganhoQuebras").innerText = moeda(ganhoQuebras);
document.getElementById("ganhoEstoque").innerText = moeda(ganhoEstoque);

document.getElementById("roiFinal").innerText = `${roi}x`;
document.getElementById("alivioCaixa").innerText =
  `Alívio de Caixa: ${moeda(ganhoEstoque)}`;
