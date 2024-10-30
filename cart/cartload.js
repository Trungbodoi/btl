const cartitem=document.getElementById("book-container")
const label=document.getElementById("label")
let formatPrice = (price) => {
    return price.toLocaleString('de-DE'); // Định dạng giá
  };


console.log(basket) 

let generateCartItems = () => {
    if (basket.length !== 0) {
      
        cartitem.innerHTML = basket.map(x => {
          let { id, item ,name,price,image } = x;
          return `
                <div class="cart">
                    <div class="cartimg"><img src=${image}></div>
                    <div class="rest">
                        <div class="bookname">${name}</div>
                        <div class="quantity">Quantity:
                            <button onclick="decrease('${id}')">❮</button>
                            <span>${item}</span>
                            <button onclick="increase('${id}')">❯</button>
                        </div> 
                        <div class="cprice">${formatPrice(price*item)}đ</div>
                        <button class="deletecart" onclick="deletecart('${id}' )"><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                    </div>
                </div>
        `;
        })
        .join("");
        let totalAmount = basket.reduce((acc, curr) => acc + (curr.price * curr.item), 0);
        let sum=document.getElementById("sumprice");
        sum.textContent = `Total: ${formatPrice(totalAmount)}đ`;
    } else {
      cartitem.innerHTML = "";
      let sum=document.getElementById("sumprice");
      sum.textContent = `Total: 0đ`
      label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="../library/library.html" class="return">👈Quay lại trang mua sắm ? </a>
      `;
      document.getElementById("right").style.display="none";
    }
  };
  
generateCartItems();
let increase = (id) => {
    let search = basket.find((x) => x.id === id); 
    if (search) {
        search.item += 1;
        localStorage.setItem("data", JSON.stringify(basket));
        updateNotifyCount(basket.length);
        generateCartItems(); 
    }
};

let decrease = (id) => {
    let search = basket.find((x) => x.id === id); 
    if (search) { 
        if (search.item > 1) { 
            search.item -= 1; 
        } else {

            basket = basket.filter((x) => x.id !== id);
        }
        localStorage.setItem("data", JSON.stringify(basket)); 
        updateNotifyCount(basket.length);
        generateCartItems(); 
    }
};


let deletecart = (id) => {
    basket = basket.filter((x) => x.id !== id); 
    localStorage.setItem("data", JSON.stringify(basket));
    updateNotifyCount(basket.length);
    generateCartItems();  // Cập nhật lại giỏ hàng
};

function populateDropdown() {
    const dropdown = document.getElementById('dropdown');
    const vcItems = JSON.parse(localStorage.getItem('vc'));

    if (vcItems) {
        vcItems.forEach(item => {
            const option = document.createElement('option');
            option.textContent = `${item.name} số lượng x${item.item} `; // Tên hiển thị trong dropdown
            dropdown.appendChild(option);
        });
    }
}

// Gọi hàm để tạo dropdown khi trang được tải
populateDropdown();

