const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
  let errors = [];

  if (firstname_input) {
    // Đăng ký
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    // Đăng nhập
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  } else {
    e.preventDefault();
    setCookie('isLoggedIn', 'true', 1); // Cookie hết hạn sau 1 ngày
    window.location.href = 'profile.html';
  }
});

// Hàm tạo cookie với thời gian hết hạn
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // `days` là số ngày
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Hàm đọc giá trị cookie
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

function getSignupFormErrors(firstname, email, password, repeatPassword){
  let errors = []

  if(firstname === '' || firstname == null){
    errors.push('Bạn chưa điền tên đăng nhập')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if(email === '' || email == null){
    errors.push('Bạn chưa điền email')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Bạn chưa điền mật khẩu')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password.length < 8){
    errors.push('Mật khẩu cần có độ dài từ 8 kí tự trở lên')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password !== repeatPassword){
    errors.push('Nhập lại mật khẩu không đúng')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }


  return errors;
}

function getLoginFormErrors(email, password){
  let errors = []

  if(email === '' || email == null){
    errors.push('Bạn chưa điền email')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Bạn chưa điền mật khẩu')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})
const eo1=document.getElementById("eye-open1")
const eo2=document.getElementById("eye-open2")
const ec1=document.getElementById("eye-closed1")
const ec2=document.getElementById("eye-closed2")

function togglePasswordVisibility1() {

  if (password_input.type === "password") {
      password_input.type = "text";
      eo1.style.visibility="visible";
      ec1.style.visibility="hidden";
  } else {
      password_input.type = "password"; 
      eo1.style.visibility="hidden";
      ec1.style.visibility="visible";
  }
  }
function togglePasswordVisibility1() {

  if (password_input.type === "password") {
      password_input.type = "text";
      eo1.style.visibility="visible";
      ec1.style.visibility="hidden";
  } else {
      password_input.type = "password"; 
      eo1.style.visibility="hidden";
      ec1.style.visibility="visible";
  }
}
function togglePasswordVisibility2() {

  if (repeat_password_input.type === "password") {
      repeat_password_input.type = "text";
      eo2.style.visibility="visible";
      ec2.style.visibility="hidden";
  } else {
      repeat_password_input.type = "password"; 
      eo2.style.visibility="hidden";
      ec2.style.visibility="visible";
  }
}
