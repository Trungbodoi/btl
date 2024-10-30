
function showPopup() {
    var aboutText = document.getElementById("about-text").textContent;
    document.getElementById("about-edit").value = aboutText;
    document.getElementById("edit-popup").style.display = 'flex';
}

function closePopup() {
    document.getElementById("edit-popup").style.display = 'none';
}

function saveChanges() {
    var newAboutText = document.getElementById("about-edit").value.trim();
    
    if (newAboutText === "") {
        alert("Vui lòng nhập nội dung trước khi lưu.");
    } else {
        document.getElementById("about-text").textContent = newAboutText;
        closePopup();
    }
}

function editProfile() {
    const usernameInput = document.getElementById("username");
    const imageUpload = document.getElementById("image-upload");
    const userImg = document.getElementById("user-img");
    const editButton = document.querySelector(".user button");

    if (usernameInput.disabled) {
        usernameInput.disabled = false;
        imageUpload.style.display = "block";
        editButton.textContent = "Save";
    } else {
        usernameInput.disabled = true;
        imageUpload.style.display = "none";
        editButton.textContent = "Edit name";
        
        const newName = usernameInput.value;
        if (newName) {
            console.log("Tên mới:", newName);
        }
    }
}
//edit anh
document.getElementById("image-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("user-img").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
