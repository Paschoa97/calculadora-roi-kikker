const params = new URLSearchParams(window.location.search);

function num(v) {
  if (!v) return 0;
  return parseFloat(
    v.toString().replace(/\./g, "").replace(",", ".")
  );
}

function moeda(v) {
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// 🔹 Leitura direta da QUERY STRING
const rede = params.get("rede") || "-";
const faturamentoMensal = num(params.get("faturamento"));
const margem = num(params.get("margem")) / 100;
const lojas = num(params.get("lojas"));
const cds = num(params.get("cds"));
const itens = num(params.get("itens"));

// 🔹 Cálculos
const faturamentoAnual = faturamentoMensal * 12;
const cmv = faturamentoAnual * (1 - margem);

// Rupturas (modelo conservador)
const ganhoComercial = faturamentoAnual * 0.10 * 0.25 * margem * 0.5;
const ganhoOperacional = faturamentoAnual * 0.10 * 0.25 * margem * 0.5;

// Quebras
const ganhoQuebras = cmv * 0.03 * 0.35;

// Estoques
const vendaDiaCMV = cmv / 365;
const ganhoEstoque = vendaDiaCMV * 4.5;

// ROI
const ganhosTotais =
  ganhoComercial + ganhoOperacional + ganhoQuebras;

const custo =
  (8300 * lojas) + (1600 * lojas * 12);

const roi =
  custo > 0 ? (ganhosTotais / custo).toFixed(2) : "0.00";

// 🔹 Preenchimento do HTML
document.getElementById("clienteInfo").innerText =
  `Relatório gerado para a rede: ${rede}`;

document.getElementById("fatAnual").innerText =
  moeda(faturamentoAnual);

document.getElementById("margem").innerText =
  (margem * 100).toFixed(0) + "%";

document.getElementById("lojas").innerText = lojas;
document.getElementById("cds").innerText = cds;
document.getElementById("itens").innerText = itens;

document.getElementById("ganhoComercial").innerText =
  moeda(ganhoComercial);

document.getElementById("ganhoOperacional").innerText =
  moeda(ganhoOperacional);

document.getElementById("ganhoQuebras").innerText =
  moeda(ganhoQuebras);

document.getElementById("ganhoEstoque").innerText =
  moeda(ganhoEstoque);

document.getElementById("roiFinal").innerText =
  roi + "x";

document.getElementById("alivioCaixa").innerText =
  "Alívio de Caixa estimado: " + moeda(ganhoEstoque);
