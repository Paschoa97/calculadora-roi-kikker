// ====== MÁSCARAS ======

// Faturamento em R$
const faturamentoInput = document.getElementById("faturamento");
faturamentoInput.addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, "");
  valor = (valor / 100).toFixed(2);
  valor = valor.replace(".", ",");
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  this.value = "R$ " + valor;
});

// Margem %
const margemInput = document.getElementById("margem");
margemInput.addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, "");
  if (valor !== "") {
    this.value = valor + "%";
  }
});

// Itens ativos por loja (milhar)
const itensInput = document.getElementById("itens");
itensInput.addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, "");
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  this.value = valor;
});

// Bloquear números negativos e decimais em lojas e CDs
const lojasInput = document.getElementById("lojas");
const cdsInput = document.getElementById("cds");

[lojasInput, cdsInput].forEach(input => {
  input.addEventListener("input", function(){
    let valor = this.value.replace(/\D/g,"");
    this.value = valor;
  });
});

// ====== FORM SUBMIT ======

document.getElementById("roiForm").addEventListener("submit", function(e){
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let telefone = document.getElementById("telefone").value;
  let rede = document.getElementById("rede").value;

  let faturamentoTexto = document.getElementById("faturamento").value
    .replace("R$","")
    .replace(/\./g,"")
    .replace(",",".");
  let faturamentoMensal = Number(faturamentoTexto);

  let margemTexto = document.getElementById("margem").value.replace("%","");
  let margem = Number(margemTexto) / 100;

  let lojas = Number(document.getElementById("lojas").value);
  let cds = Number(document.getElementById("cds").value);

  let itensTexto = document.getElementById("itens").value.replace(/\./g,"");
  let itens = Number(itensTexto);

  // ====== CÁLCULOS ======
  let faturamentoAnual = faturamentoMensal * 12;
  let cmv = faturamentoAnual - (faturamentoAnual * margem);

  let ganhoComercial = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;
  let ganhoOperacional = (faturamentoAnual * 0.10 * 0.25 * margem) * 0.5;

  let reducaoAvaria = (cmv * 0.03) * 0.35;

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
    rede,
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
