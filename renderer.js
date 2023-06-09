class Crenderer {
	constructor(content) {
		this.content = content.replace(/<.*>/, '');
	}

	is_keyword_format(word) {
		const keywords = ['const', 'enum', 'extern', 'register', 'sizeof',
			'static', 'struct', 'typedef', 'union', 'volatile', 'signed', 'unsigned'];

		return keywords.includes(word);
	}

	is_control_flow(word){
		const flow_words = ['break', 'case', 'continue', 'default', 'do',
			'else', 'for', 'goto', 'if', 'return', 'switch', 'while'];

		return flow_words.includes(word);
	}

	is_type(word){
		const type_words = ['char', 'short', 'int', 'long', 'double'];

		return type_words.includes(word) || word.endsWith('_t');
	}

	is_string(word){
		return (word.startsWith('"') && word.endsWith('"')) || (word.startsWith("'") && word.endsWith("'"));
	}

	number_format(word) {
		return !isNaN(+word);
	}

	tokenize(line) {
		const types_regex = /\b(char|short|int|long|float|double|\w[\w\d]*_t)\b/g

		// escape sequences
		line = line.replace('<', "&lt;").replace('>', "&gt;");

		line = line.replace(/("[^\"]*")/, (_, v) => `<span class="string">${v}</span>`);
		line = line.replace(types_regex, (_, v) => `<span class="type">${v}</span>`);
		console.log(line);
		return [line];
	}

	render() {
		return this.content.split('\n').map(this.tokenize)
	}
}

const codigo = document.getElementById("codigo")

codigo.addEventListener("keydown", function(e){
	console.log(e);
	let cod = document.getElementById("codigo");
	let renderer = new Crenderer(cod.innerHTML);

	if (e.key === "Backspace")
		cod.innerHTML = cod.innerHTML.slice(0, -1);
	else
		cod.innerHTML += e.key.length == 1? e.key : '';
	cod.innerHTML = renderer.render()
})
