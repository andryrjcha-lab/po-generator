let items = [];

function addItem() {
    items.push({
        desc: "",
        material: "",
        qty: "",
        unit: "",
        price: ""
    });
    renderItems();
}

function renderItems() {
    let tbody = document.getElementById("itemsBody");
    tbody.innerHTML = "";

    items.forEach((item, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td><input class="itemInput" data-i="${i}" data-f="desc" value="${item.desc}"></td>
            <td><input class="itemInput" data-i="${i}" data-f="material" value="${item.material}"></td>
            <td><input class="itemInput" data-i="${i}" data-f="qty" value="${item.qty}"></td>
            <td><input class="itemInput" data-i="${i}" data-f="unit" value="${item.unit}"></td>
            <td><input class="itemInput" data-i="${i}" data-f="price" value="${item.price}"></td>
        </tr>
        `;
    });

    document.querySelectorAll(".itemInput").forEach(inp => {
        inp.addEventListener("input", e => {
            let i = e.target.dataset.i;
            let f = e.target.dataset.f;
            items[i][f] = e.target.value;
            updatePreview();
        });
    });
}

function updatePreview() {
    p_poNo.innerText = poNo.value;
    p_toCompany.innerText = toCompany.value;
    p_toUP.innerText = toUP.value;
    p_toAddress.innerText = toAddress.value;
    p_siteId.innerText = siteId.value;
    p_siteName.innerText = siteName.value;
    p_currency.innerText = currency.value;

    const today = new Date().toLocaleDateString("id-ID");
    p_date.innerText = today;
    p_date2.innerText = today;

    let tbody = document.getElementById("itemsBody");
    tbody.innerHTML = "";

    items.forEach((item, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${item.desc}</td>
            <td>${item.material}</td>
            <td>${item.qty}</td>
            <td>${item.unit}</td>
            <td>${formatRupiah(item.price)}</td>
        </tr>
        `;
    });
}

function formatRupiah(x) {
    if (!x) return "";
    return parseFloat(x).toLocaleString("id-ID");
}

logoUpload.onchange = e => {
    let file = e.target.files[0];
    let r = new FileReader();
    r.onload = () => logoImg.src = r.result;
    r.readAsDataURL(file);
};

signUpload.onchange = e => {
    let file = e.target.files[0];
    let r = new FileReader();
    r.onload = () => signImg.src = r.result;
    r.readAsDataURL(file);
};

function generatePDF() {
    let element = document.getElementById("poPreview");

    let opt = {
        margin: 0,
        filename: (poNo.value || "PO-RDG") + ".pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save();
}
