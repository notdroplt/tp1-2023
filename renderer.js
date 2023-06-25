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
		const function_regex = /(\w+)\((.+)*,*\s*(.+)?\)/g
		const num_regex = /(\d\.?\d*)/g
		// escape sequences
		line = line.replace('<', "&lt;").replace('>', "&gt;");

		line = line.replace(/("[^\"]*")/, (_, v) => `<span class="string">${v}</span>`)
					.replace(function_regex, (_, v, ...e) => `<span class="function">${v}</span>(${e.filter(el => typeof el == 'string').slice(0, -1)[0]})`)
					.replace(types_regex, (_, v) => `<span class="type">${v}</span>`)
					.replace(num_regex, (_, v) => `<span class="number">${v}</span>`)
		return line;
	}

	render() {
		return this.content.split('\n').filter(el => el.trim()).map(this.tokenize)
	}
}
(cod => {
	let arr = Array.from(cod);
	arr.forEach(element => {
		let renderer = new Crenderer(element.innerHTML);
		element.innerHTML = renderer.render();
	})

})(document.getElementsByClassName("codeblock"))
