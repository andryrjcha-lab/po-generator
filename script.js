let items = [];

function addItem(){
  items.push({
    desc:"",
    material:"",
    qty:"",
    unit:"",
    price:""
  });
  renderItems();
}

function renderItems(){
  let tbody = document.getElementById("itemsBody");
  tbody.innerHTML = "";
  items.forEach((it, i)=>{
    tbody.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td><input class="itemInput" data-i="${i}" data-f="desc" value="${it.desc}"></td>
        <td><input class="itemInput" data-i="${i}" data-f="material" value="${it.material}"></td>
        <td><input class="itemInput" data-i="${i}" data-f="qty" value="${it.qty}"></td>
        <td><input class="itemInput" data-i="${i}" data-f="unit" value="${it.unit}"></td>
        <td><input class="itemInput" data-i="${i}" data-f="price" value="${it.price}"></td>
      </tr>`;
  });

  document.querySelectorAll(".itemInput").forEach(inp=>{
    inp.addEventListener("input", e=>{
      let i = e.target.dataset.i;
      let f = e.target.dataset.f;
      items[i][f] = e.target.value;
      updatePreview();
    });
  });
}

function updatePreview(){
  document.getElementById("p_poNo").innerText = poNo.value;
  document.getElementById("p_toCompany").innerText = toCompany.value;
  document.getElementById("p_toUP").innerText = toUP.value;
  document.getElementById("p_toAddress").innerText = toAddress.value;
  document.getElementById("p_siteId").innerText = siteId.value;
  document.getElementById("p_siteName").innerText = siteName.value;
  document.getElementById("p_currency").innerText = currency.value;

  let today = new Date().toLocaleDateString("id-ID");
  p_date.innerText = today;
  p_date2.innerText = today;

  let tbody = document.getElementById("itemsBody");
  tbody.innerHTML = "";
  items.forEach((it, i)=>{
    tbody.innerHTML += `
    <tr>
      <td>${i+1}</td>
      <td>${it.desc}</td>
      <td>${it.material}</td>
      <td>${it.qty}</td>
      <td>${it.unit}</td>
      <td>${formatRupiah(it.price)}</td>
    </tr>`;
  });
}

function formatRupiah(x){
  if(!x) return "";
  return parseFloat(x).toLocaleString("id-ID");
}

logoUpload.onchange = e=>{
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = ()=> logoImg.src = reader.result;
  reader.readAsDataURL(file);
};

signUpload.onchange = e=>{
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = ()=> signImg.src = reader.result;
  reader.readAsDataURL(file);
};

function generatePDF(){
  let element = document.getElementById("poPreview");

  let opt = {
    margin: 0,
    filename: (poNo.value || "PO-RDG") + ".pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(opt).from(element).save();
}
