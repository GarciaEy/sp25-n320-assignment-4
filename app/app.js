function generateTicket() {
  let eventSelection = document.getElementById("event").value.split(" - ");
  let userName = document.getElementById("name").value.trim();

  if (userName === "") {
    alert("Please enter your name before proceeding");
    return;
  }

  let ticketNumber = Math.random().toString(36).substr(2, 7).toUpperCase();

  document.getElementById("eventName").innerText = eventSelection[0];
  document.getElementById("eventDateTime").innerText = eventSelection[1];
  document.getElementById("userName").innerText = userName;
  document.getElementById("ticketNumber").innerText = ticketNumber;

  document.getElementById("ticket").style.display = "block";
}

function downloadPDF() {
  window.print();
}
