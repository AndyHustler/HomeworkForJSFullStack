function loadImage (url) {
    console.log("loadImage");
    return new Promise((res,rej) => {
        let img = document.createElement('img');
        img.src = url;
        img.onload = () => res(img);
        img.onerror = () => rej(new Error("Cannot load img " + url))
    })
}

const img_arr = ["./img/1.png","./img/2.png","./img/3.png","./img/4.png","./img/5.png","./img/6.png","./img/7.png","./img/8.png","./img/9.png","./img/10.png"];

async function funcLoad (arr) {
    console.log("funcLoad");
    let iarr = [];
    for (const v of arr) {
        try {
            let a = await loadImage(v);
            iarr.push(a);
        } catch(e) {
            console.log("ERROR! " + e);
            const div = document.createElement('div');
            div.innerText = e;
            iarr.push(div);
        }
    }
    return iarr;
}

async function func () {
    console.log("func");
    let imgs = await funcLoad(img_arr);
    console.log(imgs);
    const root = document.getElementById("root");
    if (Array.isArray(imgs)) {
        imgs.forEach((v) => {
            root.appendChild(v);
        })
    } else {
        root.innerHTML = imgs;
    }
}