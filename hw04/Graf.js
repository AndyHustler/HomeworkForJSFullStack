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
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) throw new Error('Таких вершин нет.');
        if (!this.vertices[vertex1].includes(vertex2)) this.vertices[vertex1].push(vertex2);
        if (!this.vertices[vertex2].includes(vertex1)) this.vertices[vertex2].push(vertex1);
    }
    
    //Обход вершин
    dfs(startVertex, callback) {
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
}

let gr = new Graph;
let ar1 = ['a','b','c','d','e','f','g','h'];
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
    ['g','h']
];

ar1v.forEach((i) => {gr.addEdge(i[0],i[1])});

console.log(gr);
gr.dfs('h',(i) => {console.log(i)});
