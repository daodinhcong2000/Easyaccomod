// SELECT INPUT
var inputName = document.querySelector("input[name='fullname']");
var inputEmail = document.querySelector("input[name='email']");
var inputPhone = document.querySelector("input[name='phone']");
var inputPassword = document.querySelector("input[name = 'password']");
var inputRePassword = document.querySelector("input[name= 'repassword']");
// Label ERROR
var errorName = document.createElement('label');
var errorEmail = document.createElement('label');
var errorPhone = document.createElement('label');
var errorPassword = document.createElement('label');
var errorRePassword = document.createElement('label');
errorName.textContent= "ERROR"
errorEmail.textContent = "ERROR"
errorPhone.textContent = "ERROR"
errorPassword.textContent = 'Mật khẩu cần ít nhất 8 kí tự'
errorRePassword.textContent = 'Mật khẩu cần trùng khớp'
errorName.style.display = 'none';
errorEmail.style.display = 'none';
errorPhone.style.display = 'none'
errorPassword.style.display = 'none';
errorRePassword.style.display = 'none';
// document insert ERROR
inputName.parentNode.insertBefore(errorName, inputName);
inputEmail.parentNode.insertBefore(errorEmail, inputEmail);
inputPhone.parentNode.insertBefore(errorPhone, inputPhone);
inputPassword.parentNode.insertBefore(errorPassword, inputPassword);
inputRePassword.parentNode.insertBefore(errorRePassword, inputRePassword);
function checksummit(btn){
   // console.log(document.getElementById('1'));

var fullname = inputName.value;
var email = inputEmail.value;
var phone = inputPhone.value;
var password = inputPassword.value;
var repassword = inputRePassword.value;



var regeEmail = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
var regeName = /^([A-Za-z0-9]+)(\s([A-Za-z0-9])+)*$/
//var regeName1 = /^(?!.*(\d|\[|\]|\{|\}|\\|\||\/|\$|\*|\^|\+|\.|\?|#|%|,|~|=|,|<|>|;|'|:|"|@)).*$/
var regePhone = /^\d{10}$/
var regePassword = /^((?!.*\s).+){8,}$/
if (!fullname.match(regeName) || !email.match(regeEmail) || !phone.match(regePhone) || !password.match(regePassword) || password != repassword)
{
    if (!fullname.match(regeName)) errorName.style.display = 'block';
    else errorName.style.display = 'none';
    if (!email.match(regeEmail)) errorEmail.style.display = 'block';
    else errorEmail.style.display = 'none';
    if (!phone.match(regePhone)) errorPhone.style.display = 'block';
    else errorPhone.style.display = 'none'
    if (!password.match(regePassword)) errorPassword.style.display = 'block';
    else errorPassword.style.display = 'none';
    if (password != repassword ) errorRePassword.style.display = 'block';
    else errorRePassword.style.display = 'none';

}
else{

    errorName.style.display = 'none';
    errorEmail.style.display = 'none';
    errorPhone.style.display = 'none'
    errorPassword.style.display = 'none';
    errorRePassword.style.display = 'none';
    var cus = {
    }
    cus.fullname = fullname;
    cus.email = email;
    cus.phone = phone;
    cus.password = password;
    fetch('http://localhost:3001/customer/register/store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(cus)
    })
    .then(response => {
    })
}
//console.log('     abcd '.match(regeName));


}