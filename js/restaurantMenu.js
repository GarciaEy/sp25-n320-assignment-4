import {jsPDF} from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

const myDoc = new jsPDF();
const cart = [];

function addCart(event) {
    const button = event.target;
    const foodName = button.getAttribute('foodName');
    const foodPrice = button.getAttribute('foodPrice');
    cart.push({name: foodName, price: foodPrice});
}

// const nums = [];

// function addNum() {
//     nums.push(1);
// }

function downloadPdf() {
    myDoc.save("myDoc.pdf");
}

function viewPdf() {
    myDoc.text("Receipt", 20, 20);
    myDoc.text("------------------", 20, 30);

    let y = 40;
    let total = 0;

    cart.forEach(item => {
        myDoc.text(`${item.name} - ${item.price}`, 20, y);
        y += 10;
        total += parseFloat(item.price);
    });
    myDoc.text(`Total: ${total.toFixed(2)}`, 20, y + 10);

    // let numLineY = 15;
    // nums.forEach(function(num) {
    //     myDoc.text(String(num), 10, numLineY);
    //     numLineY += 5;
    // });

    const dataUrl = myDoc.output
    ("bloburl");

    console.log(dataUrl);

    document.querySelector("#pdf-preview").src = dataUrl + "#toolbar=0";
}
document.querySelectorAll(".cart").forEach(button => {
    button.addEventListener("click", addCart);
});

document.querySelector("#download-pdf").onclick = downloadPdf;

document.querySelector("#view-pdf").onclick = viewPdf;

document.querySelector(".cart").onclick = addCart;