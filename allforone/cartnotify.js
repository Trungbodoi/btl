let basket = JSON.parse(localStorage.getItem("data")) || [];

function updateNotifyCount(count) {
    const notifyCount = document.getElementById("notify");
  
    if (count > 0) {
      notifyCount.textContent = count;
      notifyCount.style.display = "inline";
    } else {
      notifyCount.style.display = "none";
    }
  }
  updateNotifyCount(basket.length);