const cartitem=document.getElementById("item-container")
const label=document.getElementById("label")

let formatPrice = (price) => {
    return price.toLocaleString('de-DE'); // Định dạng giá
  };
// Mở popup
function showPopup() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("address-popup").style.display = "block";
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("address-popup").style.display = "none";
}


// Kiểm tra và xác thực form
function validForm(event) {
  event.preventDefault(); // Ngăn chặn hành động submit mặc định

  // Lấy giá trị các trường
  const name = document.getElementById("Name").value.trim();
  const phone = document.getElementById("Phone").value.trim();
  const address = document.getElementById("Address").value.trim();

  let isValid = true;

  // Kiểm tra tên
  if (name === "") {
      document.getElementById("name_error").textContent = "Tên không được để trống";
      isValid = false;
  } else {
      document.getElementById("name_error").textContent = "";
  }

  // Kiểm tra số điện thoại
  const phonePattern = /^0[0-9]{9}$/;
  if (!phonePattern.test(phone)) {
      document.getElementById("phone_error").textContent = "SĐT không hợp lệ";
      isValid = false;
  } else {
      document.getElementById("phone_error").textContent = "";
  }

  // Kiểm tra địa chỉ
  if (address === "") {
      document.getElementById("address_error").textContent = "Địa chỉ không được để trống";
      isValid = false;
  } else {
      document.getElementById("address_error").textContent = "";
  }

  // Nếu hợp lệ, cập nhật thông tin địa chỉ mới và đóng popup
  if (isValid) {
      document.getElementById("display-name").textContent = `${name} ${phone}`;
      document.getElementById("display-address").textContent = address;
      closePopup();
  }
}


console.log(basket) 

let generateCartItems = () => {
    if (basket.length !== 0) {
      
        cartitem.innerHTML = basket.map(x => {
          let { item ,name,price,image } = x;
          return `
                <div class="cart">
                    <div class="cartimg"><img src=${image}></div>
                    <div class="rest">
                      <div class="bookname">${name}</div>
                      <div class="quantity">Quantity:${item}</div>
                      <div class="cprice"><span>Total:</span> <span class="price">${formatPrice(price*item)}đ</span></div>
                    </div> 

                </div>
        `;
        })
        .join("");

    }else {
      cartitem.innerHTML = "";
      label.innerHTML = `
      <h2>Cart is Empty</h2>
      `;
    }
  };
  
generateCartItems();
let totalAmount = basket.reduce((acc, curr) => acc + (curr.price * curr.item), 0);
let sum=document.getElementById("sumprice");
sum.textContent = `Total: ${formatPrice(totalAmount)}đ`;
let shipcost = 15000;
let ship= document.getElementById("ship")
ship.innerHTML = `Ship: ${formatPrice(shipcost)}d`
let final=document.getElementById("final")



document.getElementById("order").addEventListener("click", function() {
  const options = document.getElementsByName("method");
  let isSelected = false;

  for (const option of options) {
      if (option.checked) {
          isSelected = true;
          break;
      }
  }

  const message = document.getElementById("message");
  if (!isSelected) {
      message.textContent = "Vui lòng chọn phương thức thanh toán";
      message.style.color = "red";
      return; // Dừng lại nếu chưa chọn phương thức thanh toán
  }

  // Kiểm tra thông tin địa chỉ trước khi thanh toán
  const name = document.getElementById("Name").value.trim();
  const phone = document.getElementById("Phone").value.trim();
  const address = document.getElementById("Address").value.trim();

  if (!name || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin địa chỉ trước khi thanh toán");
      return; // Dừng lại nếu địa chỉ chưa hợp lệ
  }

  // Tạo thông báo đơn hàng thành công
  const successMessage = `Đơn hàng sẽ sớm được vận chuyển đến địa chỉ: <b>${address}</b>.<br> 
                          Người nhận: <b>${name}</b> - SĐT: <b>${phone}</b>.<br> 
                          Vui lòng giữ máy khi shipper liên lạc. Trân trọng!`;

  document.getElementById("purchaseMessage").innerHTML = successMessage;
  document.getElementById("purchaseModal").style.display = "block";
  document.getElementById("overlay2").style.display = "block";

  // Xóa giỏ hàng và cập nhật lại giao diện
  basket = [];
  localStorage.removeItem("data"); 
  decrementItem();
  updateNotifyCount(basket.length);
  generateCartItems();
});

// Đóng modal khi bấm vào nút Đóng
document.getElementById("returnhome").addEventListener("click", () => {
  window.location.href = '../index.html';
});


function populateDropdown() {
  const dropdown = document.getElementById('dropdown');
  const vcItems = JSON.parse(localStorage.getItem('vc'));

  if (vcItems) {
      vcItems.forEach(item => {
          const option = document.createElement('option');
          option.value=item.pricedecrease;
          option.textContent = `${item.name} số lượng x${item.item} `; // Tên hiển thị trong dropdown
          dropdown.appendChild(option);
      });
  }
}
function updateFinalCost() {
  const dropdown = document.getElementById('dropdown');

  const selectedPrice = parseFloat(dropdown.value) || 0; 

  const finalCost = shipcost + totalAmount - selectedPrice;
  if (finalCost < 0) {
    finalCost = 0; // Đặt thành 0 nếu finalCost nhỏ hơn 0
}

  final.innerHTML = `Final: ${formatPrice(finalCost)}d`; // Hiển thị kết quả
}

// Gọi hàm để tạo dropdown khi trang được tải
populateDropdown();
updateFinalCost();
function decrementItem() {
  const dropdown = document.getElementById('dropdown');
  const selectedId = parseInt(dropdown.value);
  let vcItems = JSON.parse(localStorage.getItem('vc'));

  const selectedItem = vcItems.find(item => item.pricedecrease === selectedId);
  if (selectedItem && selectedItem.item > 0) {
      selectedItem.item -= 1;

      if (selectedItem.item === 0) {
          vcItems = vcItems.filter(item => item.pricedecrease !== selectedId);
      }

      localStorage.setItem('vc', JSON.stringify(vcItems)); 
      populateDropdown(); //
      updateFinalCost(); 
  }
  
}
document.getElementById('dropdown').addEventListener('change', updateFinalCost);

