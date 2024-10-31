
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');



const product = data.find(p => p.id == productId);

if (product) {
    document.title = product.bookname;
    document.getElementById('bookname').textContent = product.bookname;
    document.getElementById('bookimage').src = product.image;
    document.getElementById('author').textContent = product.author;
    document.getElementById('nxb').textContent = product.nxb;
    document.getElementById('year').textContent = product.year;
    document.getElementById('language').textContent = product.language;
    document.getElementById('pages').textContent = product.pages;
    document.getElementById('form').textContent = product.form;
    if (product.saleprice != null) {
        document.getElementById('saleprice').textContent = product.saleprice.toLocaleString('de-DE')+'đ';
    } else {
        document.getElementById('saleprice').style.display = 'none';
        document.getElementById('realprice').classList.remove('old-price');
        document.getElementById('realprice').classList.add('current-price');
    }
    document.getElementById('realprice').textContent = product.realprice.toLocaleString('de-DE')+'đ';
    if (product.saletag) {
        document.getElementById('saletag').textContent = product.saletag;
    } else {
        document.getElementById('saletag').style.display = 'none';
    }
    document.getElementById('description').textContent = product.description;
} else {
    document.getElementById('product-details').innerHTML = '<p>Không tìm thấy sản phẩm</p>';
}

