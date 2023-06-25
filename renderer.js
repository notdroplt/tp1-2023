/// Código MUITO SIMPLIFICADO para colorir códigos em C
///
/// por Arthur, 2023

const render = content => {
	return content.split('\n').filter(el => el.trim()) // remover linhas em branco
				  .map(l => {
		return l.replace('<', "&lt;").replace('>', "&gt;") // transformar </> em HTML entities

				// regex é impossível de compreender, não tem como fazer muita coisa aqui
				.replace(/("[^\"]*")/, (_, v) => `<span class="string">${v}</span>`)
				.replace(/(\w+)\((.+)*,*\s*(.+)?\)/g, (_, v, ...e) => `<span class="function">${v}</span>(${e.filter(el => typeof el == 'string').slice(0, -1)[0]})`)
				.replace(/\b(char|short|int|long|float|double|return|\w[\w\d]*_t)\b/g, (_, v) => `<span class="type">${v}</span>`)
				// "hack" para fazer com que `funcao(...)` consiga
				// capturar todos os argumentos sem deletá-los, retornando
				// `<...>funcao</...>(...)`
				.replace(/\b(\d\.?\d*)\b/g, (_, v) => `<span class="number">${v}</span>`) 
				.replace(/(\/\/.*)/g, (_, v) => `<span class="comment">${v}</span>`)
				.replace(/(%\w)/g, (_, v) => `<span class="format">${v}</span>`)
				.replace(/(\\\w)/g, (_, v) => `<span class="escape">${v}</span>`)
				+ '<br>'
	}).join('')
}

const instructions = /\b(mov|ldr|ldp|str|stp|add|sub|neg|mul|udiv|sdiv|lsl|lsr|asr|and|orr|eor|mvn|cmp|tst|br|cbz|cbnz|b|beq|bne|bmi|bpl|bgt|bge|blt|ble|bl|blr|ret)\b/g

const asm_render = content => {
	return content.split('\n').filter(el => el.trim()) // remover linhas em branco
				  .map(l => {
					  return l
					  .replace(/([xw]\d{1,2}|sp)/g, (_, v) => `<span class="register">${v}</span>`)
					  .replace(instructions, (_, v) => `<span class="instruction">${v}</span>`)
				.replace(/\b(\d\.?\d*|#[\da-fA-F]+)\b/g, (_, v) => `<span class="number">${v}</span>`) 
				.replace(/(;.*)/g, (_, v) => `<span class="comment">${v}</span>`)
				.replace(/(^.*:)/g,  (_, v) => `<span class="label">${v}</span>`)
				+ '<br>'
	}).join('')
}

Array.from(document.getElementsByClassName("codeblock")).forEach(e => { 
	e.innerHTML = render(e.innerHTML)
});

Array.from(document.getElementsByClassName("asmcodeblock")).forEach(e => { 
	e.innerHTML = asm_render(e.innerHTML)
});
