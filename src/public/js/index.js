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
}


function showNotifies(){
	fetch("/db/db_nofi.txt")
	  .then(
		function(response) {
		  if (response.status !== 200) {
			console.log('Lỗi, mã lỗi ' + response.status);
			return;
		  }
		  // parse response data
		  response.json().then(data => {
			var i = 0;
			var countNofi = 0;
			for(i in data){
			  var xmlhttps = `<li class="dropdown-menu-item read`+ data[i].view + `" >
							  <a href="#" class="dropdown-menu-link ">
								<div>
								  <i class="far fa-dot-circle"></i>
								  <br>
								  <p>` + data[i].nameUser + `</p>
								</div>
								<span>
								` + data[i].text + `
								  <br>
								  <span>
								  ` + data[i].date + `
								  </span>
								</span>
							  </a>
							</li>`;
			
			 
			 // document.querySelector("#notification-menu .dropdown-menu-content").innerHTML = xmlhttps;
			 if(data[i].view == "0"){
				countNofi += 1;
				$("#notification-menu .dropdown-menu-content").append(xmlhttps);
			  //console.log(document.querySelector("#notification-menu .dropdown-menu-content .0").style.backgroundColor = "red")
			}
			else{
				$("#notification-menu .dropdown-menu-content").append(xmlhttps);
			}
		}
			//document.querySelector("#notification-menu .dropdown-menu-content .read0").style.backgroundColor = "#eee";
			//console.log(document.querySelector("#notification-menu .dropdown-menu-content"));
			if(countNofi != 0){
				document.querySelector(".dropdown .nav-link ").innerHTML = `<i class="fas fa-bell dropdown-toggle" data-toggle="notification-menu"></i>
																					<span class="navbar-badge">${countNofi}</span>`;
			}
			else{
				document.querySelector(".dropdown .nav-link ").innerHTML = `<i class="fas fa-bell dropdown-toggle" data-toggle="notification-menu"></i>`
			}
		  })
		}
	  )
	};
  
showNotifies();
  



function testAPI(){
	fetch('http://localhost:3001/admin/getLandlord')
  		.then(response => console.log(response))
  		//.then(data => console.log(data));
}
  
//testAPI();
