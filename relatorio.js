let dados = JSON.parse(localStorage.getItem("relatorioROI"));

function moeda(valor){
  return valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

document.getElementById("clienteInfo").innerText =
  `Cliente: ${dados.nome} | Rede: ${dados.rede} | Email: ${dados.email}`;

document.getElementById("fatAnual").innerText = moeda(dados.faturamentoAnual);
document.getElementById("margem").innerText = dados.margem + "%";
document.getElementById("lojas").innerText = dados.lojas;
document.getElementById("cds").innerText = dados.cds;
document.getElementById("itens").innerText = dados.itens;

document.getElementById("ganhoComercial").innerText = moeda(dados.ganhoComercial);
document.getElementById("ganhoOperacional").innerText = moeda(dados.ganhoOperacional);
document.getElementById("ganhoQuebras").innerText = moeda(dados.ganhoQuebras);
document.getElementById("ganhoEstoque").innerText = moeda(dados.ganhoEstoque);

document.getElementById("roiFinal").innerText = dados.roi + "x";
document.getElementById("alivioCaixa").innerText =
  "Alívio de Caixa: " + moeda(dados.alivioCaixa);
