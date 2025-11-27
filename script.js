// script.js
document.addEventListener('DOMContentLoaded', ()=>{

  const logoInput = document.getElementById('logoInput');
  const logoPreview = document.getElementById('logoPreview');
  const signInput = document.getElementById('signInput');
  const signPreview = document.getElementById('signPreview');

  // If user uploaded logo, show it; else keep default 'logo rdg.jpg' if present
  logoInput.addEventListener('change', e=>{
    const f = e.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = (ev)=> {
      logoPreview.src = ev.target.result;
    }
    reader.readAsDataURL(f);
  });

  // signature upload
  signInput.addEventListener('change', e=>{
    const f = e.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = (ev)=> {
      signPreview.src = ev.target.result;
      signPreview.style.display = 'block';
    }
    reader.readAsDataURL(f);
  });

  // Items logic
  const itemsBody = document.getElementById('itemsBody');
  const addRowBtn = document.getElementById('addRowBtn');
  const resetRowsBtn = document.getElementById('resetRowsBtn');

  function createRow(index, data={}){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="no">${index}</td>
      <td><input type="text" class="desc" value="${data.desc||''}" /></td>
      <td><input type="text" class="matno" value="${data.matno||''}" /></td>
      <td><input type="number" min="0" class="qty" value="${data.qty||1}" /></td>
      <td><input type="text" class="uom" value="${data.uom||'Set'}" /></td>
      <td><input type="number" min="0" class="price" value="${data.price||0}" /></td>
      <td class="line-total">0</td>
      <td><button class="del">Hapus</button></td>
    `;
    // events
    tr.querySelectorAll('.qty, .price').forEach(inp=>{
      inp.addEventListener('input', updateTotals);
    });
    tr.querySelector('.del').addEventListener('click', ()=>{
      tr.remove();
      renumber();
      updateTotals();
    });
    itemsBody.appendChild(tr);
    renumber();
    updateTotals();
  }

  function renumber(){
    itemsBody.querySelectorAll('tr').forEach((r,i)=>{
      r.querySelector('.no').textContent = i+1;
    });
  }

  addRowBtn.addEventListener('click', ()=> createRow(itemsBody.children.length+1));
  resetRowsBtn.addEventListener('click', ()=> {
    itemsBody.innerHTML = '';
    createRow(1, {desc:'Standart Panel KWH Outdoor 3 Phase - For B2S IOH', qty:1, price:3000000});
    createRow(2, {desc:'Standart Panel ACPDB Outdoor 3 Phase - For B2S IOH', qty:1, price:5500000});
    updateTotals();
  });

  // initialize with two example rows
  resetRowsBtn.click();

  function updateTotals(){
    let subtotal = 0;
    itemsBody.querySelectorAll('tr').forEach(tr=>{
      const qty = parseFloat(tr.querySelector('.qty').value)||0;
      const price = parseFloat(tr.querySelector('.price').value)||0;
      const total = qty * price;
      tr.querySelector('.line-total').textContent = numberWithSep(total);
      subtotal += total;
    });

    const discount = 0;
    const tax = Math.round(subtotal * 0.11); // contoh PPN 11%
    const grand = subtotal - discount + tax;

    document.getElementById('subtotalText').textContent = numberWithSep(subtotal);
    document.getElementById('discountText').textContent = numberWithSep(discount);
    document.getElementById('taxText').textContent = numberWithSep(tax);
    document.getElementById('grandText').textContent = numberWithSep(grand);
    document.getElementById('terbilang').value = toTerbilang(grand);

    // preview fields
    document.getElementById('p_subtotal').textContent = numberWithSep(subtotal);
    document.getElementById('p_discount').textContent = numberWithSep(discount);
    document.getElementById('p_tax').textContent = numberWithSep(tax);
    document.getElementById('p_grand').textContent = numberWithSep(grand);
    document.getElementById('p_terbilang').textContent = toTerbilang(grand);
    renderPreviewItems();
  }

  function numberWithSep(x){
    return (x||0).toLocaleString('id-ID');
  }

  // terbilang (basic, supports up to miliar)
  function toTerbilang(n){
    if(!Number.isFinite(n)) return '';
    const angka = ["","Satu","Dua","Tiga","Empat","Lima","Enam","Tujuh","Delapan","Sembilan","Sepuluh","Sebelas"];
    function penyebut(n){
      n = Math.floor(n);
      let result = '';
      if(n < 12) result = angka[n];
      else if(n < 20) result = penyebut(n-10) + ' Belas';
      else if(n < 100) result = penyebut(Math.floor(n/10)) + ' Puluh' + (n%10? ' ' + penyebut(n%10):'');
      else if(n < 200) result = 'Seratus' + (n-100? ' ' + penyebut(n-100):'');
      else if(n < 1000) result = penyebut(Math.floor(n/100)) + ' Ratus' + (n%100? ' ' + penyebut(n%100):'');
      else if(n < 2000) result = 'Seribu' + (n-1000? ' ' + penyebut(n-1000):'');
      else if(n < 1000000) result = penyebut(Math.floor(n/1000)) + ' Ribu' + (n%1000? ' ' + penyebut(n%1000):'');
      else if(n < 1000000000) result = penyebut(Math.floor(n/1000000)) + ' Juta' + (n%1000000? ' ' + penyebut(n%1000000):'');
      else result = penyebut(Math.floor(n/1000000000)) + ' Miliar' + (n%1000000000? ' ' + penyebut(n%1000000000):'');
      return result;
    }
    if(n === 0) return 'Nol Rupiah';
    return penyebut(n) + ' Rupiah';
  }

  // render preview fields
  function renderPreviewItems(){
    // fields map
    document.getElementById('p_toCompany').textContent = document.getElementById('toCompany').value;
    document.getElementById('p_up').textContent = document.getElementById('up').value;
    document.getElementById('p_address').textContent = document.getElementById('address').value;
    const poNo = document.getElementById('poNo').value;
    document.getElementById('p_poNo').textContent = poNo;
    const dt = document.getElementById('poDate').value;
    document.getElementById('p_poDate').textContent = dt ? new Date(dt).toLocaleDateString('id-ID') : '';
    document.getElementById('p_currency').textContent = document.getElementById('currency').value;
    document.getElementById('p_siteId').textContent = document.getElementById('siteId').value;
    document.getElementById('p_siteName').textContent = document.getElementById('siteName').value;
    document.getElementById('p_termsDelivery').textContent = document.getElementById('termsDelivery').value;
    document.getElementById('p_bankInfo').textContent = document.getElementById('bankInfo').value;

    const tbody = document.getElementById('p_itemsBody');
    tbody.innerHTML = '';
    itemsBody.querySelectorAll('tr').forEach((tr,i)=>{
      const desc = tr.querySelector('.desc').value;
      const matno = tr.querySelector('.matno').value;
      const qty = parseFloat(tr.querySelector('.qty').value)||0;
      const uom = tr.querySelector('.uom').value;
      const price = parseFloat(tr.querySelector('.price').value)||0;
      const total = qty*price;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${i+1}</td>
        <td>${escapeHtml(desc)}</td>
        <td>${escapeHtml(matno)}</td>
        <td>${qty}</td>
        <td>${escapeHtml(uom)}</td>
        <td style="text-align:right">${numberWithSep(price)}</td>
        <td style="text-align:right">${numberWithSep(total)}</td>
      `;
      tbody.appendChild(row);
    });
  }

  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // preview button
  document.getElementById('previewBtn').addEventListener('click', ()=>{
    renderPreviewItems();
    alert('Preview di bagian bawah sudah diperbarui. Scroll ke "Preview / Hasil".');
    window.scrollTo({top:document.getElementById('poPreview').offsetTop - 20, behavior:'smooth'});
  });

  // generate PDF
  document.getElementById('generatePdfBtn').addEventListener('click', ()=>{
    renderPreviewItems();

    const element = document.getElementById('poPreview');

    const opt = {
      margin:       [10, 10, 10, 10], // top, left, bottom, right (mm)
      filename:     (document.getElementById('poNo').value || 'PO') + '.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // generate
    html2pdf().set(opt).from(element).save();
  });

});
