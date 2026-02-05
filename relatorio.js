const dados = JSON.parse(localStorage.getItem("kikker_roi") || "{}");

function numero(v) {
  if (!v) return 0;
  return parseFloat(v.toString().replace(/\./g, "").replace(",", "."));
}

function moeda(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const faturamentoMensal = numero(dados.faturamento);
const margem = numero(dados.margem) / 100;
const lojas = numero(dados.lojas);
const cds = numero(dados.cds);
const itens = numero(dados.itens);

const faturamentoAnual = faturamentoMensal * 12;
const cmv = faturamentoAnual * (1 - margem);

const ganhoComercial = faturamentoAnual * 0.0125 * margem;
const ganhoOperacional = faturamentoAnual * 0.0125 * margem;
const ganhoQuebras = cmv * 0.0105;

const vendaDiaCMV = cmv / 365;
const ganhoEstoque = vendaDiaCMV * 4.5;

const ganhosTotais = ganhoComercial + ganhoOperacional + ganhoQuebras;
const custo = (8300 * lojas) + (1600 * lojas * 12);

const roi = custo > 0 ? (ganhosTotais / custo).toFixed(2) : "0.00";

document.getElementById("clienteInfo").innerText =
  `Relatório gerado para a rede: ${dados.rede || "-"}`;

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
  "Alívio de Caixa estimado: " + moeda(ganhoEstoque);
