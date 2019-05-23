window.addEventListener('load', function() {
	let login = document.getElementById('loginNav')
	let find = document.getElementById("filterDiv")
	let access = document.getElementById("access")
	let findbttn = document.getElementById("filterNav")
	let addbttn = document.getElementById("addNav")
	let setbttn = document.getElementById("setNav")
	let homebttn = document.getElementById("homeNav")
	let setarea = document.getElementById("setPrefs")
	let addarea = document.getElementById("addRide")
	let logSwitch = document.getElementById("regSwitch")
	let accessText =  document.getElementById("accessText")
	let accessBttn = document.getElementById("accessBttn")
	login.addEventListener('click', function() {
   		find.style.display = "none"
   		access.style.display = "flex"
	})
	findbttn.addEventListener('click', function() {
   		find.style.display = "flex"
   		if(access){
   			access.style.display = "none"
   		}
   		setarea.style.display = "none"
   		if(addbttn && setbttn){
   			setarea.style.display = "none"
   			addarea.style.display = "none"
   		}
	})
	if(logSwitch){
		logSwitch.addEventListener('click', function() {
	   		if(logSwitch.textContent === "(REGISTER?)"){
	   			logSwitch.textContent = "(LOGIN?)"
	   			accessText.textContent = "REGISTER"
	   			access.setAttribute("action","/register")
	   		}
	   		else{
	   			logSwitch.textContent = "(REGISTER?)"
	   			accessText.textContent = "LOGIN"
	   			access.setAttribute("action","/login")
	   		}
		})
	}
	if(addbttn && setbttn){
		addbttn.addEventListener('click', function() {
	   		find.style.display = "none"
	   		setarea.style.display = "none"
	   		addarea.style.display = "flex"
		})
		setbttn.addEventListener('click', function() {
	   		find.style.display = "none"
	   		addarea.style.display = "none"
	   		setarea.style.display = "flex"
		})
	}

	

   	init()
})
function init(){
	

}