let dados = JSON.parse(localStorage.getItem("relatorioROI"));

document.getElementById("infoLead").innerText =
  `Cliente: ${dados.nome} | Email: ${dados.email}`;

function moeda(valor){
  return valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

document.getElementById("fatAnual").innerText = moeda(dados.faturamentoAnual);
document.getElementById("margemOut").innerText = dados.margem + "%";
document.getElementById("lojasOut").innerText = dados.lojas;
document.getElementById("cdsOut").innerText = dados.cds;
document.getElementById("itensOut").innerText = dados.itens;

document.getElementById("ganhoComercial").innerText = moeda(dados.ganhoComercial);
document.getElementById("ganhoOperacional").innerText = moeda(dados.ganhoOperacional);
document.getElementById("ganhoQuebras").innerText = moeda(dados.ganhoQuebras);
document.getElementById("ganhoEstoque").innerText = moeda(dados.ganhoEstoque);

document.getElementById("roiFinal").innerText = dados.roi + "x";
document.getElementById("alivioFinal").innerText = "Alívio de Caixa: " + moeda(dados.alivioCaixa);
