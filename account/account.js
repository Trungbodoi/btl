// Hàm lấy giá trị của cookie theo tên
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null; // Trả về null nếu cookie không tồn tại
}

if (getCookie('isLoggedIn') === 'true') {
    const currentLocation = window.location.pathname; // Lấy đường dẫn hiện tại
    const isIndexPage = currentLocation.endsWith('index.html') || currentLocation.endsWith('/'); // Kiểm tra xem có phải là index.html hoặc thư mục gốc

    if (isIndexPage) {
        document.getElementById('customer').href = 'account/profile.html'; // Không sử dụng ../
    } else {
        document.getElementById('customer').href = '../account/profile.html'; // Sử dụng ../
    }
}
