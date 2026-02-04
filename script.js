document.getElementById("roiForm").addEventListener("submit", function(e){
  e.preventDefault();

  // Inputs
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let telefone = document.getElementById("telefone").value;

  let faturamentoMensal = Number(document.getElementById("faturamento").value);
  let margem = Number(document.getElementById("margem").value) / 100;
  let lojas = Number(document.getElementById("lojas").value);
  let cds = Number(document.getElementById("cds").value);

  // Base
  let faturamentoAnual = faturamentoMensal * 12;
  let cmv = faturamentoAnual - (faturamentoAnual * margem);

  // Ruptura Comercial
  let rupturaComercial = faturamentoAnual * 0.10;
  let reducaoComercial = rupturaComercial * 0.25;
  let ganhoComercial = reducaoComercial * margem * 0.5;

  // Ruptura Operacional
  let rupturaOperacional = faturamentoAnual * 0.10;
  let reducaoOperacional = rupturaOperacional * 0.25;
  let ganhoOperacional = reducaoOperacional * margem * 0.5;

  // Quebras
  let avaria = cmv * 0.03;
  let reducaoAvaria = avaria * 0.35;

  // Redução estoques
  let vendaDia = faturamentoAnual / 365;
  let vendaDiaCMV = vendaDia - (vendaDia * margem);
  let reducaoDias = (3 + 6) / 2;
  let valorReducaoEstoque = vendaDiaCMV * reducaoDias;

  // Ganhos totais
  let ganhosTotais = ganhoComercial + ganhoOperacional + reducaoAvaria;

  // Custos Kikker
  let investimentoInicial = 8300 * lojas;
  let mensalidade = 1600 * lojas;
  let custoAnual = (mensalidade * 12) + investimentoInicial;

  // ROI
  let roi = (ganhosTotais / custoAnual).toFixed(2);
  let alivioCaixa = valorReducaoEstoque.toFixed(2);

  // Mostrar resultado
  document.getElementById("resultado").innerHTML = `
    <h3>Resultado</h3>
    <p>ROI estimado: <strong>${roi}x</strong></p>
    <p>Alívio de caixa estimado: <strong>R$ ${Number(alivioCaixa).toLocaleString("pt-BR")}</strong></p>
  `;

  // Enviar para RD Station
  fetch("https://api.rd.services/platform/conversions?api_key=SUA_API_KEY_AQUI", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "Calculadora ROI Kikker",
        name: nome,
        email: email,
        mobile_phone: telefone,
        faturamento_mensal: faturamentoMensal,
        margem_bruta: margem * 100,
        lojas: lojas,
        cds: cds,
        roi_estimado: roi,
        alivio_caixa: alivioCaixa
      }
    })
  })
  .then(response => console.log("Lead enviado ao RD"))
  .catch(err => console.error("Erro RD:", err));

});
