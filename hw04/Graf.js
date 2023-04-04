console.log('------------------------------------------------');
console.log('Graph');
console.log('------------------------------------------------');
class Graph {
    constructor() {
        this.vertices = {}; // список смежности графа
    }
    
    //Добавление вершин
    addVertex(value) {
        if (!this.vertices[value]) this.vertices[value] = [];
    }
    
    //Добавление рёбер
    addEdge(vertex1, vertex2) {
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) throw new Error('Таких вершин нет в списке вершин. Список вершин: ' + Object.keys(this.vertices));
        if (!this.vertices[vertex1].includes(vertex2)) this.vertices[vertex1].push(vertex2);
        if (!this.vertices[vertex2].includes(vertex1)) this.vertices[vertex2].push(vertex1);
    }
    
    //Обход вершин в глубину с использованием стека
    dfs(startVertex, callback) {
        if (!(startVertex in this.vertices)) throw new Error('Аргумент не входит в список вершин. Список вершин: ' + Object.keys(this.vertices));
        let list = this.vertices; // список смежности
        let stack = [startVertex]; // стек вершин для перебора
        let visited = { [startVertex]: 1 }; // посещенные вершины
        
        function handleVertex(vertex) {
            // вызываем коллбэк для посещенной вершины
            callback(vertex);
            
            // получаем список смежных вершин
            let reversedNeighboursList = [...list[vertex]].reverse();
            
            reversedNeighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                // отмечаем вершину как посещенную
                visited[neighbour] = 1;
                // добавляем в стек
                stack.push(neighbour);
                }
            });
        }
        
        // перебираем вершины из стека, пока он не опустеет
        while(stack.length) {
            let activeVertex = stack.pop();
            handleVertex(activeVertex);
        }
        
        // проверка на изолированные фрагменты
        stack = Object.keys(this.vertices);

        while(stack.length) {
            let activeVertex = stack.pop();
            if (!visited[activeVertex]) {
                visited[activeVertex] = 1;
                handleVertex(activeVertex);
            }
        }
    }

    //Обход вершин в ширину с использованием очереди
    bfs(startVertex, callback) {
        if (!(startVertex in this.vertices)) throw new Error('Аргумент не входит в список вершин. Список вершин: ' + Object.keys(this.vertices));
        let list = this.vertices; // список смежности
        let queue = [startVertex]; // очередь вершин для перебора
        let visited = { [startVertex]: 1 }; // посещенные вершины
          
        function handleVertex(vertex) {
            // вызываем коллбэк для посещенной вершины
            callback(vertex);
            
            // получаем список смежных вершин
            let neighboursList = list[vertex];
            neighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                    visited[neighbour] = 1;
                    queue.push(neighbour);
                }
            });
        }
        
        // перебираем вершины из очереди, пока она не опустеет
        while(queue.length) {
            let activeVertex = queue.shift();
            handleVertex(activeVertex);
        }
        console.log('2 queue = ' + queue);      
        queue = Object.keys(this.vertices);
        
        // Повторяем цикл для незатронутых вершин
        while(queue.length) {
            let activeVertex = queue.shift();
            if (!visited[activeVertex]) {
                visited[activeVertex] = 1;
                handleVertex(activeVertex);
            }
        }
    }
    //Обход вершин вширину и сохранение расстояния до каждой вершины от исходной
    bfs2(startVertex) {
        
        let list = this.vertices; 
        let queue = [startVertex];
        let visited = { [startVertex]: 1 }; 
        
        // кратчайшее расстояние от стартовой вершины
        let distance = { [startVertex]: 0 }; 
        // предыдущая вершина в цепочке
        let previous = { [startVertex]: null };
    
        function handleVertex(vertex) {
            let neighboursList = list[vertex];
            neighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                visited[neighbour] = 1;
                queue.push(neighbour);
                // сохраняем предыдущую вершину
                previous[neighbour] = vertex;
                // сохраняем расстояние 
                distance[neighbour] = distance[vertex] + 1;
                }
            });
        }
    
        // перебираем вершины из очереди, пока она не опустеет
        while(queue.length) {
            let activeVertex = queue.shift();
            handleVertex(activeVertex);
        }
        
        return { distance, previous }
    }

    //Поиск кратчайшего расстояния между заданными вершинами
    findShortestPath(startVertex, finishVertex) {
        let result = this.bfs2(startVertex);
    
        if (!(finishVertex in result.previous)) 
        return (`Нет пути из вершины ${startVertex} в вершину ${finishVertex}`);
            
        let path = [];
        
        let currentVertex = finishVertex;
        
        while(currentVertex !== startVertex) {
            path.unshift(currentVertex);
            currentVertex = result.previous[currentVertex];
        }
        
        path.unshift(startVertex);
        
        return path;
      }
}

//Функция для поиска ближайшей вершины из известных
function findNearestVertex(distances, visited) {
    let minDistance = Infinity;
    let nearestVertex = null;
  
    Object.keys(distances).forEach(vertex => {
        if (!visited[vertex] && distances[vertex] < minDistance) {
            minDistance = distances[vertex];
            nearestVertex = vertex;
        }
    });
    return nearestVertex;
}

//Алгоритм Дейкстры предназначен для поиска путей во взвешенных графах 
//с неотрицательными весами ребер.
//Функция выводит кратчайшие пути от выбранной вершины до всех остальных во взвешенном графе
function dijkstra(graph, startVertex) {
    let visited = {};
    let distances = {}; // кратчайшие пути из стартовой вершины
    let previous = {}; // предыдущие вершины
      
    let vertices = Object.keys(graph); // список вершин графа
    
    // по умолчанию все расстояния неизвестны (бесконечны)
    vertices.forEach(vertex => {
        distances[vertex] = Infinity;
        previous[vertex] = null;
    });
  
    // расстояние до стартовой вершины равно 0
    distances[startVertex] = 0;
  
    function handleVertex(vertex) {
        // расстояние до вершины
        let activeVertexDistance = distances[vertex]; 
        
        // смежные вершины (с расстоянием до них)
        let neighbours = graph[activeVertex];
        
        // для всех смежных вершин пересчитать расстояния
        Object.keys(neighbours).forEach(neighbourVertex => {
            // известное на данный момент расстояние
            let currentNeighbourDistance = distances[neighbourVertex];
            // вычисленное расстояние
            let newNeighbourDistance = activeVertexDistance + neighbours[neighbourVertex];
            
            if (newNeighbourDistance < currentNeighbourDistance) {
                distances[neighbourVertex] = newNeighbourDistance;
                previous[neighbourVertex] = vertex;
            }
        });
        
        // пометить вершину как посещенную
        visited[vertex] = 1;
    }
    
    // ищем самую близкую вершину из необработанных
    let activeVertex = findNearestVertex(distances, visited);
  
    // продолжаем цикл, пока остаются необработанные вершины 
    while(activeVertex) {
        handleVertex(activeVertex);
        activeVertex = findNearestVertex(distances, visited);
    }
    
    return { distances, previous };
}

let gr = new Graph;
let ar1 = ['a','b','c','d','e','f','g','h','x','y','z'];
ar1.forEach((i) => {gr.addVertex(i)});
let ar1v = [
    ['a','b'],
    ['a','d'],
    ['a','f'],
    ['b','c'],
    ['c','d'],
    ['c','e'],
    ['c','f'],
    ['d','g'],
    ['e','g'],
    ['f','h'],
    ['g','h'],
    ['g','x'],
    ['c','y']
];

/*
let graph = {
    a: { b, d, f },
    b: { a, c },
    c: { b, d, e, f, y },
    d: { a, c, g },
    e: { c, g },
    f: { a, c, h },
    g: { d, e, h, x },
    h: { f, g },
    x: { g },
    y: { c },
    z: {},
}
*/
//Задаем взвешенный граф как объект объектов (ключ: значение)
let vgraph = {
    a: { b: 4, d: 9, f: 3 },
    b: { a: 4, c: 7 },
    c: { b: 7, d: 3, e: 8, f: 8, y: 5 },
    d: { a: 9, c: 3, g: 1 },
    e: { c: 8, g: 8 },
    f: { a: 3, c: 8, h: 5 },
    g: { d: 1, e: 8, h: 3, x:2 },
    h: { f: 5, g: 3 },
    x: { g: 2 },
    y: { c: 5 },
    z: {},
}

let orvgraph = {
    a: { b: 4, d: 9, f: 3 },
    b: { c: 7 },
    c: { d: 3, e: 8, f: 8, y: 5 },
    d: { g: 1 },
    e: { g: 8 },
    f: { h: 5 },
    g: { h: 3, x:2 },
    h: {},
    x: {},
    y: {},
    z: {},
}

ar1v.forEach((i) => {gr.addEdge(i[0],i[1])});

console.log(gr);
console.log('Обход в длину');
gr.dfs('a',(i) => {console.log('dfs: ' + i)});
console.log('Обход в ширину');
gr.bfs('a', v => console.log('bfs: ' + v));
let startVertex = 'b';
console.log(`Поиск всех путей из вершины ${startVertex}`);
console.log(gr.bfs2(startVertex));
finishVertex = 'x';
console.log(`Поиск кратчайшего пути из вершины ${startVertex} в вершину ${finishVertex}`);
console.log(gr.findShortestPath(startVertex, finishVertex));
startVertex = 'b';
finishVertex = 'z';
console.log(`Поиск кратчайшего пути из вершины ${startVertex} в вершину ${finishVertex}`);
console.log(gr.findShortestPath(startVertex, finishVertex));
startVertex = 'b';
console.log(`Поиск расстояний в неориентированном графе от вершины ${startVertex}`);
console.log(dijkstra(vgraph, startVertex));
startVertex = 'a';
console.log(`Поиск расстояний в ориентированном графе от вершины ${startVertex}`);
console.log(dijkstra(orvgraph, startVertex));

const objgraph = new Object();
console.log(objgraph);
objgraph['a'] = 5;
console.log(objgraph);
console.log(Object.keys(objgraph));

class TarifSearch {
    constructor() {
        this.citys = {}; // список смежности графа
    }
    
    //Добавление вершин
    addCitys(value) {
        if (!this.citys[value]) this.citys[value] = {};
    }
    
    //Добавление рёбер
    addTarif(city1, city2, val) {
        if (!(city1 in this.citys) || !(city2 in this.citys)) throw new Error('Таких городов нет в списке. Список городов: ' + Object.keys(this.citys));
        if (!(city2 in this.citys[city1])) this.citys[city1][city2] = val;
        if (!(city1 in this.citys[city2])) this.citys[city2][city1] = val;
    }
}

let gao = new TarifSearch;
ar1.forEach((i) => {gao.addCitys(i)});
let ar1vv = [
    ['a','b', 4],
    ['a','d', 9],
    ['a','f', 3],
    ['b','c', 7],
    ['c','d', 3],
    ['c','e', 8],
    ['c','f', 8],
    ['d','g', 1],
    ['e','g', 8],
    ['f','h', 5],
    ['g','h', 3],
    ['g','x', 2],
    ['c','y', 5]
];

ar1vv.forEach((i) => {gao.addTarif(i[0],i[1],i[2])});
console.log(gao);

console.log('-----------------------------------------------------------------');
console.log('Поиск минимальной стоимости проезда');

let tarif = [
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
    "c;y=5"
];

function StringParser(str) {
    let ar = str.split(';');
    let ar1 = ar[1].split('=');
    ar = ar.splice(0,1);
    ar = ar.concat(ar1);
    console.log(ar)
    return ar;
}

let cts = new TarifSearch;
ar1.forEach((i) => {cts.addCitys(i)});
console.log(cts);
tarif.forEach((i) => {cts.addTarif(StringParser(i)[0],StringParser(i)[1],Number(StringParser(i)[2]))});
console.log(cts);