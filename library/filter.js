
const productsPerPage = 8;
let currentPage = 1;
let filteredProducts = [];

// Lưu trữ các phần tử DO
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pageNumber = document.getElementById("page-number");



// Lọc sản phẩm
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll(".filter input[type=checkbox]:checked"))
        .map(checkbox => checkbox.value);

    // Lọc sản phẩm và lưu vào biến `filteredProducts`
    filteredProducts = data.filter(product => {
        const priceToCheck = product.saleprice !== null ? product.saleprice : product.realprice;

        const isPriceLower = selectedCategories.includes("pricelower") && priceToCheck < 100000;
        const isPriceHigher = selectedCategories.includes("pricehigher") && priceToCheck >= 100000;
        const matchesPrice = (!selectedCategories.includes("pricelower") && !selectedCategories.includes("pricehigher")) || isPriceLower || isPriceHigher;

        const selectedOtherCategories = selectedCategories.filter(category => 
            category !== "pricelower" && category !== "pricehigher" && 
            category !== "sortLowToHigh" && category !== "sortHighToLow"
        );
        const matchesCategories = selectedOtherCategories.length === 0 || selectedOtherCategories.every(category => product.categories.includes(category));

        return matchesPrice && matchesCategories;
    });

    // Sắp xếp sản phẩm đã lọc nếu có lựa chọn
    if (selectedCategories.includes("sortLowToHigh")) {
        filteredProducts.sort((a, b) => {
            const priceA = a.saleprice !== null ? a.saleprice : a.realprice;
            const priceB = b.saleprice !== null ? b.saleprice : b.realprice;
            return priceA - priceB;
        });
    } else if (selectedCategories.includes("sortHighToLow")) {
        filteredProducts.sort((a, b) => {
            const priceA = a.saleprice !== null ? a.saleprice : a.realprice;
            const priceB = b.saleprice !== null ? b.saleprice : b.realprice;
            return priceB - priceA;
        });
    }

    // Đặt lại `currentPage` về 1 khi lọc
    currentPage = 1;

    // Gọi `generateShop` với `filteredProducts` mới
    generateShop(filteredProducts);
}


// Lắng nghe sự kiện thay đổi của các checkbox
document.querySelectorAll(".filter input[type=checkbox]").forEach(checkbox => {
    checkbox.addEventListener("change", filterProducts);
});

const shop = document.getElementById("library");


let formatPrice = (price) => {
  return price.toLocaleString('de-DE'); // Định dạng giá
};

function generateShop(filteredProducts) {
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Tính chỉ số bắt đầu và kết thúc
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;

    // Lấy danh sách sản phẩm cho trang hiện tại
    const currentProducts = filteredProducts.slice(start, end);

    // Hiển thị sản phẩm
    shop.innerHTML = currentProducts
      .map(x => {
        let { id, bookname, saletag, realprice, image, saleprice } = x;
        return `
            <div id=${id} class="item">
            ${saletag ? `<div class="salepricetag"><span>${saletag}</span></div>` : ""}
                <a href="../bookproperties/book.html?id=${id}"><img src=${image}></a>
                <p class="bookname">${bookname}</p>
                ${saleprice ? `<p class="realprice">${formatPrice(saleprice)}đ</p>
                               <p class="oldprice">${formatPrice(realprice)} đ</p>` 
                            : `<p class="realprice">${formatPrice(realprice)}đ</p>
                               <p style="min-height:1.6rem">      </p>`}
                <button onclick="addtocart('${id}')">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                  </svg>Add to cart
                </button>
            </div>
        `;
      })
      .join("");

    // Cập nhật phân trang
    updatePagination(totalPages);
}


function updatePagination(totalPages) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = `
      <button id="prev-button" ${currentPage === 1 ? 'disabled' : ''}>❮ Previous</button>
      <span id="page-number">${currentPage} / ${totalPages}</span>
      <button id="next-button" ${currentPage === totalPages ? 'disabled' : ''}>Next ❯</button>
    `;

    document.getElementById("prev-button").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            generateShop(filteredProducts); // Dùng `filteredProducts` toàn cục
        }
    });

    document.getElementById("next-button").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            generateShop(filteredProducts); // Dùng `filteredProducts` toàn cục
        }
    });
}


// Khởi tạo trang sản phẩm ban đầu
filterProducts();

