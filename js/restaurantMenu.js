import {jsPDF} from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

let myDoc = new jsPDF();

const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

const cart = [];

function addCart(event) {
    const button = event.target;
    const foodName = button.getAttribute('foodName');
    const foodPrice = parseFloat(button.getAttribute('foodPrice'));
    const itemInCart = cart.find(item => item.name === foodName);

    if (itemInCart) {
        itemInCart.quantity += 1;
        itemInCart.totalPrice += foodPrice;
    } else {
        cart.push ({ name: foodName, price: foodPrice, quantity: 1, totalPrice: foodPrice});
    }
}

// const nums = [];

// function addNum() {
//     nums.push(1);
// }

function downloadPdf() {
    myDoc.save("myDoc.pdf");
}

function viewPdf() {
    myDoc = new jsPDF();
    myDoc.text("Receipt", 20, 20);
    myDoc.text(`Date: ${formattedDate}`, 20, 30);
    myDoc.text("------------------", 20, 35);

    let y = 40;
    let total = 0;

    cart.forEach(item => {
        myDoc.text(`${item.name} - ${item.price} x ${item.quantity} = ${item.totalPrice}`, 20, y);
        y += 10;
        total += item.totalPrice;
    });
    myDoc.text(`Total: ${total}`, 20, y + 10);

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