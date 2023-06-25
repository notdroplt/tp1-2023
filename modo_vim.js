'use strict';

let command = '';
let mode = "normal";


const command_focus = focused => {
	let linha = document.getElementById("command");
	mode = "command";
	linha.dataset.content = focused ? "command" : "normal"
}

const normal_mode = (e, linha) => {
	if (e.key === ':') {
			mode = "command";
			command_mode(e, linha);
	}
}

const insert_mode = (_, linha) => {
	window.alert("toda a página será editável a partir desse momento, esse é um processo sem volta que VAI estragar o css");
	let elements = document.getElementsByTagName("*");

	for (let i = 0; i < elements.length; ++i)
		elements[i].contentEditable = "true";
	command = "";
	linha.innerHTML = command;
	mode_handler = {}

}

const command_mode = (e, linha) => {
	if (e.key === "Backspace")
		command = command.slice(0, -1);
	else
		command += e.key.length == 1 ? e.key : '';

	if (e.key !== "Enter") {
		linha.innerHTML = command;
		return;
	}

	if (command[0] != ':') linha.dataset.content = "not a qualified command";

	switch (command) {
		case ":qa!":
			window.alert("easter egg!");
			break;
		case ":w":
		case ":wq":
			print()
			break;
		case ":github":
			window.open("https://github.com/notdroplt/tp1-2023");
			break;
		default:
			let cred = document.getElementById("cred");
			cred.style.color = "red";
			cred.innerHTML = `"${command}" não é um comando`
			break;
	}

	command = "";
	mode = "normal";
	linha.innerHTML = "";
}

let mode_handler = {
	"normal": normal_mode,
	"insert": insert_mode,
	"command": command_mode
}

document.onkeydown = (e) => {
	let linha = document.getElementById("command");
	if (mode.includes("command")) mode = "command";
	if (e.key === 'Escape') {
		mode = "normal";
		linha.classList.add("active");
	} else if (e.key === 'i' && command.length == 0 && mode === "normal")
		mode = "insert";

	mode_handler[mode](e, linha);
	linha.dataset.content = mode.toUpperCase();
}
