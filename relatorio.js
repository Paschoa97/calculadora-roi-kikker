const params = new URLSearchParams(window.location.search);

let rede = params.get("rede");
let faturamentoMensal = Number(params.get("faturamento"));
let margem = Number(params.get("margem")) / 100;
let lojas = Number(params.get("lojas"));
let cds = Number(params.get("cds"));
let itens = Number(params.get("itens"));


function moeda(valor){
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

let faturamentoAnual = faturamentoMensal * 12;
let cmv = faturamentoAnual - (faturamentoAnual * margem);

let ganhoComercial = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;
let ganhoOperacional = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;
let ganhoQuebras = (cmv * 0.03) * 0.35;

let vendaDia = faturamentoAnual / 365;
let vendaDiaCMV = vendaDia - (vendaDia * margem);
let reducaoDias = (3 + 6) / 2;
let ganhoEstoque = vendaDiaCMV * reducaoDias;

let ganhosTotais = ganhoComercial + ganhoOperacional + ganhoQuebras;

let investimentoInicial = 8300 * lojas;
let mensalidade = 1600 * lojas;
let custoAnual = (mensalidade * 12) + investimentoInicial;

let roi = (ganhosTotais / custoAnual).toFixed(2);

document.getElementById("clienteInfo").innerText =
  `Relatório gerado para a rede: ${rede}`;

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
  "Alívio de Caixa: " + moeda(ganhoEstoque);
