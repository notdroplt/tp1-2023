const generate_memory_grid = (mem_area) => {
    for (let i = 0; i < 64; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = `<p>#${i}</p>`
        mem_area.appendChild(cell);
    }
}

Array.from(document.getElementsByClassName("memory")).forEach(generate_memory_grid)
