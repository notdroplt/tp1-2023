const generate_memory_grid = (mem_area) => {
    for (let i = 0; i < 64; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = `<p>#${i}</p>`;
        cell.dataset.id = `${i}`;
        mem_area.appendChild(cell);
    }
}

const malloc_on_grid = (event) => {
    let mem_area = document.getElementById('first_memory');
    let size = document.getElementById('malloc-size').value;
    for (let child of mem_area.children) {
        if (+child.dataset.id < size) {
            if (child.dataset.id == '0')
                child.style.backgroundColor = 'cyan';
            else
                child.style.backgroundColor = 'lightblue';
            child.style.color = getComputedStyle(child).getPropertyValue('--grad-back-dark');
        }
        else {
            let n = child.dataset.id;
            child.style.backgroundColor = `#${n % 2 === 0 ? 777 : 555}`
            child.style.color = 'white'
        } 
    }
    event.preventDefault()
}

Array.from(document.getElementsByClassName("memory")).forEach(generate_memory_grid)
document.getElementById('alloc-form').addEventListener('submit', malloc_on_grid)