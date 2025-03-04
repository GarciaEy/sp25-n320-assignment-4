document.addEventListener("DOMContentLoaded", function () {
  function generateCertificate() {
    const userName = document.getElementById("userName").value;
    if (!userName) {
      alert("Please enter your name.");
      return;
    }

    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;

    const correctAnswers = {
      q1: "Paris",
      q2: "8",
    };

    let score = 0;
    if (q1 === correctAnswers.q1) score++;
    if (q2 === correctAnswers.q2) score++;

    let percentage = (score / 2) * 100;

    document.getElementById("certUser").innerText = `To: ${userName}`;
    document.getElementById(
      "certDate"
    ).innerText = `Date: ${new Date().toLocaleDateString()}`;
    document.getElementById("certScore").innerText = `Score: ${percentage}%`;
    document.getElementById("certificate").style.display = "block";
  }

  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const userName = document.getElementById("userName").value;
    const date = new Date().toLocaleDateString();
    const score = document.getElementById("certScore").innerText;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Certificate of Completion", 20, 20);

    doc.setFontSize(14);
    doc.text(`To: ${userName}`, 20, 40);
    doc.text(`Date: ${date}`, 20, 50);
    doc.text(score, 20, 60);

    doc.save("Course_Completion_Certificate.pdf");
  }

  window.generateCertificate = generateCertificate;
  window.downloadPDF = downloadPDF;
});
