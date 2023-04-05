console.log('-----------------------------------------------------------------');
console.log('Поиск минимальной стоимости проезда');
class TarifSearch {
    constructor() {
        this.citys = {};
        this.length = 0;
    }
    addCity(value) {
        if (!this.citys[value]) {
            this.citys[value] = {};
            this.length++;
        }
    }
    addTarif(city1, city2, val) {
        if (!(city1 in this.citys) || !(city2 in this.citys))
            throw new Error('Таких городов нет в списке. Список городов: ' + Object.keys(this.citys));
        if (!(city2 in this.citys[city1]))
            this.citys[city1][city2] = val;
        if (!(city1 in this.citys[city2]))
            this.citys[city2][city1] = val;
    }
    delCity(value) {
        if (this.citys[value]) {
            let dl = Object.keys(this.citys[value]);
            dl.forEach(k => {
                delete this.citys[k][value];
            });
            delete this.citys[value];
            this.length--;
            return true;
        }
        else {
            return;
        }
    }
    changeCity(oldKey, newKey) {
        if (this.citys[oldKey] && !this.citys[newKey]) {
            let ch = Object.keys(this.citys[oldKey]);
            ch.forEach(k => {
                let x = Object.values(this.citys[k]);
                let y = Object.keys(this.citys[k]);
                this.citys[k][newKey] = x[y.indexOf(oldKey)];
                delete this.citys[k][oldKey];
            });
            let v = this.citys[oldKey];
            this.citys[newKey] = v;
            delete this.citys[oldKey];
            return true;
        }
        else {
            return;
        }
    }
    minTarif(cityOut, cityIn) {
        if (!(cityOut in this.citys) || !(cityIn in this.citys))
            throw new Error('Таких городов нет в списке. Список городов: ' + Object.keys(this.citys));
        let visited = {};
        let distances = {};
        let previous = {};
        let vertices = Object.keys(this.citys);
        vertices.forEach(vertex => {
            distances[vertex] = Infinity;
            previous[vertex] = null;
        });
        distances[cityOut] = 0;
        function handleVertex(vertex, obj) {
            let activeVertexDistance = distances[vertex];
            let neighbours = obj[activeVertex];
            Object.keys(neighbours).forEach(neighbourVertex => {
                let currentNeighbourDistance = distances[neighbourVertex];
                let newNeighbourDistance = activeVertexDistance + neighbours[neighbourVertex];
                if (newNeighbourDistance < currentNeighbourDistance) {
                    distances[neighbourVertex] = newNeighbourDistance;
                    previous[neighbourVertex] = vertex;
                }
            });
            visited[vertex] = 1;
        }
        function findNearestVertex(distances, visited) {
            let minDistance = Infinity;
            let nearestVertex = null;
            Object.keys(distances).forEach((vertex) => {
                if (!visited[vertex] && distances[vertex] < minDistance) {
                    minDistance = distances[vertex];
                    nearestVertex = vertex;
                }
            });
            if (nearestVertex !== null)
                return nearestVertex;
        }
        let activeVertex = findNearestVertex(distances, visited);
        while (activeVertex) {
            handleVertex(activeVertex, this.citys);
            activeVertex = findNearestVertex(distances, visited);
        }
        if (distances[cityIn] === Infinity) {
            return;
        }
        else {
            return distances[cityIn];
        }
    }
}
let citysArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'x', 'y'];
let tarifs = [
    "a;b=4",
    "a;d=9",
    "a;f=3",
    "b;c=7",
    "c;d=3",
    "c;e=8",
    "c;f=8",
    "d;g=1",
    "e;g=8",
    "f;h=5",
    "g;h=3",
    "g;x=2",
];
function StringParser(str) {
    let ar = str.split(';');
    let ar1 = ar[1].split('=');
    ar = ar.splice(0, 1);
    ar = ar.concat(ar1);
    //console.log(ar)
    return ar;
}
let cts = new TarifSearch;
console.log(`Количесво городов в списке ${cts.length}`);
citysArr.forEach((i) => { cts.addCity(i); });
tarifs.forEach((i) => { cts.addTarif(StringParser(i)[0], StringParser(i)[1], Number(StringParser(i)[2])); });
console.log(cts);
let cin = 'a';
let cout = 'x';
console.log(`Минимальная цифра между ${cin} и ${cout} = ${cts.minTarif(cin, cout)}`);
cout = 'y';
console.log(`Минимальная цифра между ${cin} и ${cout} = ${cts.minTarif(cin, cout)}`);
console.log(`Количесво городов в списке ${cts.length}`);
console.log('delCity = ' + cts.delCity(cin));
/*
console.log(`массив ключей ${Object.keys(cts.citys['c'])}`);
console.log(`массив значений ${Object.values(cts.citys['c'])}`);
console.log(`возвращает массив пар [ключ, значение] ${Object.entries(cts.citys['c'])}`);
*/
console.log('delCity = ' + cts.delCity('w'));
console.log('change b > j = ' + cts.changeCity('b', 'j'));
console.log('change c > f = ' + cts.changeCity('c', 'f'));
