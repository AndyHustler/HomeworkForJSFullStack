let testArrey = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

testArrey = new Proxy(testArrey, {
    get(target, string) {
        const pattern = /^[0-9a-zA-Z!@#$%^&* ]+$/g;
        if (pattern.test(string)) {
            const aeiouy = /[aeiouy]/g;
            let letters = string.match(aeiouy);
            return target[letters.length];
        } else {
            return 'String not mached';
        }
    }
});

console.log(testArrey['Object which the proxy virtualizes']);
console.log(testArrey['реализация прокси в SpiderMonkey является прототипом']);