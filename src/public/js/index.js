const primaryColor = '#4834d4'
const warningColor = '#f0932b'
const successColor = '#6ab04c'
const dangerColor = '#eb4d4b'

const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLight = 'light'

const body = document.getElementsByTagName('body')[0]

function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = "expires="+d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
  var name = cname + "="
  var ca = document.cookie.split(';')
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

loadTheme()

function loadTheme() {
	var theme = getCookie(themeCookieName)
	body.classList.add(theme === "" ? themeLight : theme)
}

function switchTheme() {
	if (body.classList.contains(themeLight)) {
		body.classList.remove(themeLight)
		body.classList.add(themeDark)
		setCookie(themeCookieName, themeDark)
	} else {
		body.classList.remove(themeDark)
		body.classList.add(themeLight)
		setCookie(themeCookieName, themeLight)
	}
}

function collapseSidebar() {
	console.log("abc");
	body.classList.toggle('sidebar-expand')
	
}

window.onclick = function(event) {
	
	openCloseDropdown(event)
}

function closeAllDropdown() {
	var dropdowns = document.getElementsByClassName('dropdown-expand')
	
	for (var i = 0; i < dropdowns.length; i++) {
		dropdowns[i].classList.remove('dropdown-expand')
	}
	
}

function openCloseDropdown(event) {
	
	if (!event.target.matches('.dropdown-toggle')) {
		// 
		// đóng dropdown khi click out  dropdown menu
		// 
		closeAllDropdown()
		
	} else {
		var toggle = event.target.dataset.toggle
		var content = document.getElementById(toggle)
		if (content.classList.contains('dropdown-expand')) {
			closeAllDropdown()
		} else {
			closeAllDropdown()
			content.classList.add('dropdown-expand')
		}
	}

	console.log("abc");
}


function showNotifies(){
	fetch("http://localhost:3001/admin/getNotification")
	  .then(
		function(response) {
		  if (response.status !== 200) {
			console.log('Lỗi, mã lỗi ' + response.status);
			return;
		  }
		  // parse response data
		  response.json().then(data => {
			var i = 0;
			var countNofi = data;
			for(i in data){
				var status = `Đã cho thuê : ${data[i].fill}/${data[i].amount} `
				if(data[i].fill == 0) {
					status = `Chưa cho thuê :`
				}
			  var xmlhttps = `<li class="dropdown-menu-item`+ data[i].view + `" >
							  <a href="#" class="dropdown-menu-link ">
								<div>
								  <p> ` + data[i].fullname + `</p>
								</div>
								<span>
								` + status + data[i].roomName + `
								  <br>
								  <span>
								  ` + data[i].create_date + `
								  </span>
								</span>
							  </a>
							</li>`;
			
				$("#notification-menu .dropdown-menu-content").append(xmlhttps);
			}
		// 	 // document.querySelector("#notification-menu .dropdown-menu-content").innerHTML = xmlhttps;
		// 	 if(data[i].view == "0"){
		// 		countNofi += 1;
		// 		$("#notification-menu .dropdown-menu-content").append(xmlhttps);
		// 	  //console.log(document.querySelector("#notification-menu .dropdown-menu-content .0").style.backgroundColor = "red")
		// 	}
		// 	else{
		// 		$("#notification-menu .dropdown-menu-content").append(xmlhttps);
		// 	}
		// }
		// 	//document.querySelector("#notification-menu .dropdown-menu-content .read0").style.backgroundColor = "#eee";
		// 	//console.log(document.querySelector("#notification-menu .dropdown-menu-content"));
		//console.log(data.length );
		if(data.length != 0){
			document.querySelector(".dropdown .nav-link ").innerHTML = `<i class="fas fa-bell dropdown-toggle" data-toggle="notification-menu"></i>
																				<span class="navbar-badge">${data.length}</span>`;
		}
			else{
				document.querySelector(".dropdown .nav-link ").innerHTML = `<i class="fas fa-bell dropdown-toggle" data-toggle="notification-menu"></i>`;
				$("#notification-menu .dropdown-menu-footer").html(`<p style="text-align:center; font-size: 1rem; font-weight: bold;" >Bạn không có thông báo nào</p>`) ;
		}
		  })
		}
	  )
	};
  
showNotifies();
  



function viewAllNoties(){
	fetch('http://localhost:3001/admin/readAllNotification', {
		method: 'PUT', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		}})
		.then(response => response.json())
		.then(data => {
			if(data.data = "Thành Công"){
				document.querySelector(".dropdown-menu-content").remove();
				document.querySelector(".dropdown .nav-link ").innerHTML = `<i class="fas fa-bell dropdown-toggle" data-toggle="notification-menu"></i>`;
			}
		console.log('Success:', data);
		})
		.catch((error) => {
		console.error('Error:', error);
		});
}




