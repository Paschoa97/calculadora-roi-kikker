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

<!-- Event snippet for Contato conversion page
In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. -->
<script>
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-11176537357/ZSNzCJ2m_bIYEI3asdEp',
      'event_callback': callback
  });
  return false;
}
</script>
