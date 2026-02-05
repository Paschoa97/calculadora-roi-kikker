const params = new URLSearchParams(window.location.search);

// ---- parser robusto para números (RD Station) ----
function parseNumero(valor) {
  if (!valor) return 0;
  return parseFloat(
    valor.toString().replace(/\./g, "").replace(",", ".")
  );
}

// ---- parâmetros vindos do RD ----
let rede = params.get("rede") || "Rede não informada";
let faturamentoMensal = parseNumero(params.get("faturamento"));
let margem = parseNumero(params.get("margem")) / 100;
let lojas = parseNumero(params.get("lojas"));
let cds = parseNumero(params.get("cds"));
let itens = parseNumero(params.get("itens"));

// ---- helpers ----
function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ---- cálculos ----
let faturamentoAnual = faturamentoMensal * 12;
let cmv = faturamentoAnual - (faturamentoAnual * margem);

let ganhoComercial = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;
let ganhoOperacional = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;
let ganhoQuebras = (cmv * 0.03) * 0.35;

let vendaDia = faturamentoAnual / 365;
let vendaDiaCMV = vendaDia - (vendaDia * margem);
let ganhoEstoque = vendaDiaCMV * ((3 + 6) / 2);

let investimentoInicial = 8300 * lojas;
let mensalidade = 1600 * lojas;
let custoAnual = (mensalidade * 12) + investimentoInicial;

let ganhosTotais = ganhoComercial + ganhoOperacional + ganhoQuebras;
let roi = custoAnual > 0 ? (ganhosTotais / custoAnual).toFixed(2) : "0.00";

// ---- preencher HTML ----
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
  `Alívio de Caixa estimado: ${moeda(ganhoEstoque)}`;
