document.getElementById("verRelatorio").addEventListener("click", () => {
  const dados = {
    faturamento: Number(document.getElementById("faturamento").value),
    margem: Number(document.getElementById("margem").value),
    lojas: Number(document.getElementById("lojas").value),
    cds: Number(document.getElementById("cds").value),
    itens: Number(document.getElementById("itens").value)
  };

  // validação simples
  for (const key in dados) {
    if (!dados[key]) {
      alert("Preencha todos os campos para continuar.");
      return;
    }
  }

  localStorage.setItem("roiData", JSON.stringify(dados));

  window.location.href = "relatorio.html";
});
