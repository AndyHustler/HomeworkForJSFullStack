console.log("LinkedList");
class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor(comparator) {
        this.head = null;
        this.length = 0;
    }
    //Добавление с начала
    prepend(value) {
        let newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        this.length++;
    }
    //добавление в конец
    append(value) {
        let newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }
    //удаление
    delete(value) {
        if (!this.head) return;
        let deletedNode = null;
        while (this.head && this.head.value === value) {
            deletedNode = this.head;
            this.head = this.head.next;
            this.length--;
        }
        let currentNode = this.head;
        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                    this.length--;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }
    }
    //обход
    forEach(callback) {
        let current = this.head;
        while (current) {
            callback(current);
            current = current.next;
        }
    }
    //поиск
    find(value) {
        let current = this.head;
        while (current) {
            if(current.value === value){
                return true;
            };
            current = current.next;
        }
        return false;
    }
    //изменение
    change(fvalue,cvalue) {
        let previous = this.head
        if(previous.value === fvalue){
            previous.value = cvalue;
            return true;
        }
        let current = previous.next;
        while (current) {
            if(current.value === fvalue){
                current.value = cvalue;
                previous.next = current;
                return true;
            };
            previous = current
            current = previous.next;
        }
        return false;
    }
}

//Проверки
let a1 = [1,2,3];
console.log('a1 = ' + a1 + '; a1 length = ' + a1.length);
let a2 = ['a','b','c'];
console.log('a2 = ' + a2 + '; a2 length = ' + a2.length);
let ll = new LinkedList;
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);
//prepend
a1.forEach((i) => {
    ll.prepend(i);
    console.log('ll.length = ' + ll.length);
});
//append
a2.forEach((i) => {
    ll.append(i);
    console.log('ll.length = ' + ll.length);
});

ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

//delete
let ditem = 'c';
ll.delete(ditem);
console.log('ll.delete = ' + ditem); 
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

ditem = 3;
ll.delete(ditem);
console.log('ll.delete = ' + ditem); 
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

ditem = 'a';
ll.delete(ditem);
console.log('ll.delete = ' + ditem); 
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

//find
let fitem = 'a';
console.log('ll.fitem = ' + fitem);
if(ll.find(fitem)){
    console.log('Find true');
} else {
    console.log('Find false');
};

fitem = 1;
console.log('ll.fitem = ' + fitem);
if(ll.find(fitem)){
    console.log('Find true');
} else {
    console.log('Find false');
};

//change
ll.change(2,'box1');
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

ll.change('b','box2');
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);
