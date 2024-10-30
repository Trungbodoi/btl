if (localStorage.getItem('isLoggedIn') === 'true') {
    const currentLocation = window.location.pathname; // Lấy đường dẫn hiện tại
    const isIndexPage = currentLocation.endsWith('index.html') || currentLocation.endsWith('/'); // Kiểm tra xem có phải là index.html hoặc thư mục gốc

    if (isIndexPage) {
        document.getElementById('customer').href = 'account/profile.html'; // Không sử dụng ../
    } else {
        document.getElementById('customer').href = '../account/profile.html'; // Sử dụng ../
    }
}

