'use strict';

let editable = document.getElementsByClassName("editable");

window.addEventListener('keydown', (e) => {
	e = e || window.event;

	if (!e.target.classList.contains("editable")) return;

	if (e.key === "Backspace")
		e.target.innerText = e.target.innerText.slice(0, -1);
	else
		e.target.innerText += e.key.length == 1? e.key : '';


	console.log(e.target);

})
