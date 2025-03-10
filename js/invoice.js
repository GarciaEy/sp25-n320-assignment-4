document.addEventListener("DOMContentLoaded", function () {
  function generateInvoice() {
    const customerName = document.getElementById("customerName").value.trim();
    if (!customerName) {
      alert("Please enter a customer name.");
      return;
    }

    const rawItems = document.getElementById("invoiceItems").value.trim();
    if (!rawItems) {
      alert("Please enter at least one item.");
      return;
    }

    const items = rawItems.split("\n").map((line) => {
      const [name, quantity, price] = line.split(",").map((i) => i.trim());
      return {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        total: parseInt(quantity) * parseFloat(price),
      };
    });

    let totalAmount = items.reduce((sum, item) => sum + item.total, 0);

    document.getElementById(
      "invoiceCustomer"
    ).innerText = `Customer: ${customerName}`;
    document.getElementById(
      "invoiceDate"
    ).innerText = `Date: ${new Date().toLocaleDateString()}`;

    let detailsHTML =
      "<ul>" +
      items
        .map(
          (item) =>
            `<li>${item.name} - ${item.quantity} x $${item.price} = $${item.total}</li>`
        )
        .join("") +
      "</ul>";
    document.getElementById("invoiceDetails").innerHTML = detailsHTML;
    document.getElementById(
      "invoiceTotal"
    ).innerText = `Total: $${totalAmount.toFixed(2)}`;

    document.getElementById("invoice").style.display = "block";
  }

  function downloadInvoicePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const customerName = document.getElementById("customerName").value;
    const date = new Date().toLocaleDateString();
    const details = document.getElementById("invoiceDetails").innerText;
    const total = document.getElementById("invoiceTotal").innerText;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);

    doc.setFontSize(14);
    doc.text(`Customer: ${customerName}`, 20, 40);
    doc.text(`Date: ${date}`, 20, 50);
    doc.text(details, 20, 60);
    doc.text(total, 20, 80);

    doc.save("Invoice.pdf");
  }

  window.generateInvoice = generateInvoice;
  window.downloadInvoicePDF = downloadInvoicePDF;
});
