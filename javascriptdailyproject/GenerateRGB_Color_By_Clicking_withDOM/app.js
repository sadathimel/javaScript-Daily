window.onload = () => {
    main();
}

function main() {
    const root = document.querySelector('#root');
    const btn = document.querySelector('#change-btn');

    btn.addEventListener('click', () => {
        const bgColor = generateRandomColor();
        root.style.backgroundColor = bgColor;
        btn.style.color = bgColor;
    })

    }
   



function generateRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}