window.onload = () => {
    main();
}

function main() {
    const root = document.querySelector('#root');
    const btn = document.querySelector('#change-btn');
    const output = document.querySelector('#output');
    const copyBtn = document.querySelector('#copy-btn');

    btn.addEventListener('click', () => {
        const bgColor = generateRandomColor();
        root.style.backgroundColor = bgColor;
        btn.style.color = bgColor;
        output.style.color = bgColor;
        output.value = bgColor;
        copyBtn.style.color = bgColor;
    })

    copyBtn.addEventListener('click', function() {
         window.navigator.clipboard.writeText(output.value);
        //  alert('Copied to clipboard');
         const para = document.createElement('p');
           const node = document.createTextNode (`${output.value} Copied`);
        //    para.classList.add('bckcolor');
           para.appendChild(node);
           
           document.getElementById('input-group').appendChild(para);
           setTimeout(() => {para.style.display='none'}, 1000);
        
    })
}
   



function generateRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}