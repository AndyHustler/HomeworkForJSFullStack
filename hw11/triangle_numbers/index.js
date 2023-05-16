function* TriangleNumberGenerator() {
    for(let i=1;;i++){
        yield (0.5 * i * (i + 1));
    }
}

let generator = TriangleNumberGenerator();

function GenerateNumber() {
    const div = document.getElementById('root');
    const span = document.createElement('span');
    let {value} = generator.next();
    span.innerHTML = value + '<br/>';
    div.appendChild(span);
}