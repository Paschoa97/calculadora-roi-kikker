document.getElementById("roiForm").addEventListener("submit", function(e){
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let telefone = document.getElementById("telefone").value;

  let faturamentoMensal = Number(document.getElementById("faturamento").value);
  let margem = Number(document.getElementById("margem").value) / 100;
  let lojas = Number(document.getElementById("lojas").value);
  let cds = Number(document.getElementById("cds").value);
  let itens = Number(document.getElementById("itens").value);

  let faturamentoAnual = faturamentoMensal * 12;
  let cmv = faturamentoAnual - (faturamentoAnual * margem);

  // Rupturas
  let ganhoComercial = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;
  let ganhoOperacional = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;

  // Quebras
  let reducaoAvaria = (cmv * 0.03) * 0.35;

  // Estoques
  let vendaDia = faturamentoAnual / 365;
  let vendaDiaCMV = vendaDia - (vendaDia * margem);
  let reducaoDias = (3 + 6) / 2;
  let valorReducaoEstoque = vendaDiaCMV * reducaoDias;

  let ganhosTotais = ganhoComercial + ganhoOperacional + reducaoAvaria;

  let investimentoInicial = 8300 * lojas;
  let mensalidade = 1600 * lojas;
  let custoAnual = (mensalidade * 12) + investimentoInicial;

  let roi = (ganhosTotais / custoAnual).toFixed(2);

  let dadosRelatorio = {
    nome,
    email,
    telefone,
    faturamentoAnual,
    margem: margem*100,
    lojas,
    cds,
    itens,
    ganhoComercial,
    ganhoOperacional,
    ganhoQuebras: reducaoAvaria,
    ganhoEstoque: valorReducaoEstoque,
    roi,
    alivioCaixa: valorReducaoEstoque
  };

  localStorage.setItem("relatorioROI", JSON.stringify(dadosRelatorio));
  window.location.href = "relatorio.html";
});
