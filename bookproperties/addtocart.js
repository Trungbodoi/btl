



let addtocart = (id) => {
    const popup = document.getElementById("popup");
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 500);
      let selectedItem = data.find(x => x.id ===id);
      let pricer = selectedItem.saleprice != null ? selectedItem.saleprice : selectedItem.realprice;
  
      let search = basket.find(x => x.id === selectedItem.id);
    
      if (search === undefined) {
        basket.push({
          id: selectedItem.id,
          name: selectedItem.bookname,
          price: pricer,
          image: selectedItem.image,
          item: 1,
        });
      } else {
        search.item += 1;
      }
    
      console.log(basket);
      updateNotifyCount(basket.length);
      localStorage.setItem("data", JSON.stringify(basket));
  };
