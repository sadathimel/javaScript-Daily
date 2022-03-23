window.onload = () => {
    main();
}

function main() {
    const root = document.querySelector('#root');
    const btn = document.querySelector('#change-btn');
    const output = document.querySelector('#output');

    btn.addEventListener('click', () => {
        const bgColor = generateRandomColor();
        root.style.backgroundColor = bgColor;
        btn.style.color = bgColor;
        output.style.color = bgColor;
        output.value = bgColor;
    })

    }
   



function generateRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}