function ImageLoad(path) {
	return new Promise(function(resolve, reject) {
		let image = document.createElement('img');
		image.src = path;
        
		image.onload = () => {
			resolve(image);
		};
		image.onerror = () => {
			let div = document.createElement('div');
            div.innerText = 'image "' + path + '"  load error';
            reject(div);
		};
	});
}

async function Fnc() {
    let i = 1;
    while (i < 11) {
        let url = './n/' + i;
        const doc = document.getElementById('main');
        await ImageLoad(url)
        .then((res) => {
            console.log(res);
            doc.appendChild(res);
        })
        .catch ((res) => {
            console.log(res);
            doc.appendChild(res);
        });
        i++;
    }
}
