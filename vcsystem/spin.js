const sectors = [
    { color: "#FFBC03", text: "#333333", label: "🎫 15K",dec:15000},
    { color: "#FF5A10", text: "#333333", label: "🎫 20k",dec:20000 },
    { color: "#FFBC03", text: "#333333", label: "😂😂😂" },
    { color: "#FF5A10", text: "#333333", label: "🎫 ship",dec:15000 },
    { color: "#FFBC03", text: "#333333", label: "🎫 50k",dec:50000 },
    { color: "#FF5A10", text: "#333333", label: "😂😂😂" },
    { color: "#FFBC03", text: "#333333", label: "🎫 10k",dec:10000 },
    { color: "#FF5A10", text: "#333333", label: "😂😂😂" },
  ];
  
  const events = {
    listeners: {},
    addListener: function (eventName, fn) {
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(fn);
    },
    fire: function (eventName, ...args) {
      if (this.listeners[eventName]) {
        for (let fn of this.listeners[eventName]) {
          fn(...args);
        }
      }
    },
  };
  
  const rand = (m, M) => Math.random() * (M - m) + m;
  const tot = sectors.length;
  const spinEl = document.querySelector("#spin");
  const ctx = document.querySelector("#wheel").getContext("2d");
  const dia = ctx.canvas.width;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors.length;
  
  const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
  let angVel = 0; // Angular velocity
  let ang = 0; // Angle in radians
  
  let spinButtonClicked = false;
  
  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;
  
  function drawSector(sector, i) {
    const ang = arc * i;
    ctx.save();
  
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
  
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = "bold 30px 'Lato', sans-serif";
    ctx.fillText(sector.label, rad - 10, 10);
    //
  
    ctx.restore();
  }
  
  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  
    spinEl.textContent = !angVel ? "SPIN" : sector.label;
    spinEl.style.background = sector.color;
    spinEl.style.color = sector.text;
  }
  
  function frame() {
    if (!angVel && spinButtonClicked) {
      const finalSector = sectors[getIndex()];
      events.fire("spinEnd", finalSector);
      spinButtonClicked = false; // reset the flag
      return;
    }
  
    angVel *= friction; // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0; // Bring to stop
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    rotate();
  }
  
  function engine() {
    frame();
    requestAnimationFrame(engine);
  }
  
  function init() {
    sectors.forEach(drawSector);
    rotate(); // Initial rotation
    engine(); // Start engine
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.25, 0.45);
      spinButtonClicked = true;
    });
  }
  
  init();
  
  // Dữ liệu mẫu cho mảng 'vc'
  
  events.addListener("spinEnd", (sector) => {
    console.log(`Woop! You won ${sector.label}`);
    
    // Kiểm tra nếu phần thưởng là voucher
    if (sector.label.includes("🎫") ) {
        // Lấy mảng vc từ localStorage
        let vc = JSON.parse(localStorage.getItem('vc')) || [];
        let newVoucher = vc.find(x => x.name === sector.label);

        if (newVoucher === undefined) {
            newVoucher = {
                name: sector.label,       // Gán nhãn làm tên voucher
                pricedecrease: sector.dec,
                item: 1,
            };
            vc.push(newVoucher);
        } else {
            newVoucher.item += 1;
        }

        // Lưu lại mảng vc đã cập nhật vào localStorage
        localStorage.setItem('vc', JSON.stringify(vc));
        
        console.log("Voucher added:", newVoucher);

        // Hiển thị thông báo
        showNotification(`Congratulations! You won a ${newVoucher.name}. You now have ${newVoucher.item} of this voucher.`);
    }else{
        showNotification(`Chúc bạn may mắn lần sau 🤣🤣🤣🤣🤣🤣`);

    }
});
const notification = document.getElementById('notification');
const overlayz = document.getElementById('overlay')
const notificationMessage = document.getElementById('notification-message');
// Hàm hiển thị thông báo
function showNotification(message) {

    overlayz.style.display = 'block';
    notificationMessage.textContent = message;
    notification.style.display = 'block';
}

// Hàm đóng thông báo
function closeNotification() {
    overlayz.style.display = 'none';
    notification.style.display = 'none';
    
}

  const canvas = document.getElementById("wheel");


function resizeCanvas() {
    // Đặt kích thước cho canvas dựa trên chiều rộng của màn hình
    const size = Math.min(window.innerWidth * 0.9, 400); // 400 là kích thước tối đa
    canvas.width = size;
    canvas.height = size;
    drawWheel(); // Gọi lại hàm vẽ để điều chỉnh kích thước vòng quay
}

// Hàm vẽ lại bánh xe
function drawWheel() {
    const rad = canvas.width / 2;
    const arc = (2 * Math.PI) / sectors.length;
    
    sectors.forEach((sector, i) => {
        const ang = arc * i;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = sector.color;
        ctx.moveTo(rad, rad);
        ctx.arc(rad, rad, rad, ang, ang + arc);
        ctx.lineTo(rad, rad);
        ctx.fill();
        ctx.translate(rad, rad);
        ctx.rotate(ang + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = sector.text;
        ctx.font = `bold ${Math.max(16, rad / 8)}px sans-serif`; // Cỡ chữ linh hoạt
        ctx.fillText(sector.label, rad - 10, 10);
        ctx.restore();
    });
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Gọi ngay khi trang được tải

  