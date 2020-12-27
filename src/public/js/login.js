const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

// Kiem tra account loggin

var userName = 
	document.querySelector('#user');
var password =
	document.querySelector('#pass');

document.querySelector('.btn').onclick = function(){
	const data = { 
        phone: userName.value,
        password: password.value
     };

    fetch('http://localhost:3001/login', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data.data);
        if(data.data == 'admin') {
            console.log(data.data);
            window.location.assign("http://localhost:3001/admin")
        }
    })
    .catch((error) => {
    console.error('Error:', error);
    });

}




