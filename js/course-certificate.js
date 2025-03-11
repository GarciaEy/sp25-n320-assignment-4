import { jsPDF } from "jspdf";

function generateCertificate() {
  const userName = document.getElementById("userName").value;

  if (!userName) {
    alert("Please enter your name.");
    return;
  }

  const q1 = document.querySelector('input[name="q1"]:checked')?.value;
  const q2 = document.querySelector('input[name="q2"]:checked')?.value;

  if (!q1 || !q2) {
    alert("Please answer all questions before generating the certificate.");
    return;
  }

  let score = 0;
  if (q1 === "Paris") score++;
  if (q2 === "8") score++;

  let percentage = (score / 2) * 100;

  document.getElementById("certUser").innerText = `To: ${userName}`;
  document.getElementById(
    "certDate"
  ).innerText = `Date: ${new Date().toLocaleDateString()}`;
  document.getElementById("certScore").innerText = `Score: ${percentage}%`;
  document.getElementById("certificate").style.display = "block";
}

function downloadPDF() {
  const doc = new jsPDF();

  const userName = document.getElementById("userName").value;
  const date = new Date().toLocaleDateString();
  const score = document.getElementById("certScore").innerText;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Certificate of Completion", 50, 30);

  doc.setFontSize(16);
  doc.text(`Awarded to: ${userName}`, 50, 50);
  doc.text(`Date: ${date}`, 50, 60);
  doc.text(score, 50, 70);

  doc.save("Course_Completion_Certificate.pdf");
}
