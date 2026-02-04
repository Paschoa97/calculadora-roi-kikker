// Simulação: depois você vai passar os valores reais via querystring ou localStorage

const dados = JSON.parse(localStorage.getItem("relatorioROI"));

document.getElementById("infoLead").innerText = 
  `Rede: ${dados.nome || ""} | Email: ${dados.email || ""}`;

document.getElementById("dataRelatorio").innerText = 
  "Data: " + new Date().toLocaleDateString("pt-BR");

document.getElementById("fatAnual").innerText = formatarMoeda(dados.faturamentoAnual);
document.getElementById("margemOut").innerText = dados.margem + "%";
document.getElementById("lojasOut").innerText = dados.lojas;
document.getElementById("cdsOut").innerText = dados.cds;
document.getElementById("itensOut").innerText = dados.itens;

document.getElementById("ganhoComercial").innerText = formatarMoeda(dados.ganhoComercial);
document.getElementById("ganhoOperacional").innerText = formatarMoeda(dados.ganhoOperacional);
document.getElementById("ganhoQuebras").innerText = formatarMoeda(dados.ganhoQuebras);
document.getElementById("ganhoEstoque").innerText = formatarMoeda(dados.ganhoEstoque);

document.getElementById("roiFinal").innerText = dados.roi + "x";
document.getElementById("alivioFinal").innerText = formatarMoeda(dados.alivioCaixa);

function formatarMoeda(valor){
  return valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}
