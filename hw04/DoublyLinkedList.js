console.log('------------------------------------------------');
console.log('DoublyLinkedList');
console.log('------------------------------------------------');
/*
// Оригинальный класс
class DoublyLinkedListNode {
    constructor(value, next = null, previous = null) {
        this.previous = previous;
        this.value = value;
        this.next = next;
    }
}
*/

// Класс наследованный от LinkedListNode
class DoublyLinkedListNode extends LinkedListNode{
    constructor(value, next = null, previous = null) {
        super(value, next)
        this.previous = previous
    }
}

/*
// Оригинальный класс
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    //Добавление с начала
    prepend(value) {
        let newNode = new DoublyLinkedListNode(value, this.head);
        if (this.head) this.head.previous = newNode;
        this.head = newNode;
        if (!this.tail) this.tail = newNode;
        this.length++;
    }
    //добавление в конец
    append(value) {
        let newNode = new DoublyLinkedListNode(value,null,this.tail);
        if (this.tail) this.tail.next = newNode;
        this.tail = newNode;
        if (!this.head) this.head = newNode;
        this.length++;
    }
    //удаление
    delete(value) {
        if (!this.head) return null;

        let deletedNode = null;
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value === value) {
                deletedNode = currentNode;
                switch (deletedNode) {
                    case this.head:
                        this.head = deletedNode.next;
                        this.head.previous = null;
                        break;
                    case this.tail:
                        this.tail = deletedNode.previous;
                        this.tail.next = null;
                        break;
                    default:
                        const previousNode = deletedNode.previous;
                        const nextNode = deletedNode.next;
                        previousNode.next = nextNode;
                        nextNode.previous = previousNode;
                }
                this.length--;
            }
            currentNode = currentNode.next;
        }
    }
    //обход
    forEach(callback) {
        let currentNode = this.head;
        while (currentNode) {
            callback(currentNode);
            currentNode = currentNode.next;
        }
    }
    //поиск
    find(value) {
        let currentNode = this.head;
        let cou = 0;
        while (currentNode) {
            if(currentNode.value === value){
                cou++;
            };
            currentNode = currentNode.next;
        }
        return cou;
    }
    //изменение
    change(value,newValue) {
        if (!this.head) return null;
        let currentNode = this.head;
        let done = false;
        while (currentNode) {
            if (currentNode.value === value) {
                currentNode.value = newValue;
                done = true;
            }
            currentNode = currentNode.next;
        }
        return done;
    }
}
*/

// Класс наследованный от LinkedList
class DoublyLinkedList extends LinkedList{
    constructor(comparator) {
        super()
        this.tail = null;
    }
    //Добавление с начала
    prepend(value) {
        let newNode = new DoublyLinkedListNode(value, this.head);
        if (this.head) this.head.previous = newNode;
        this.head = newNode;
        if (!this.tail) this.tail = newNode;
        this.length++;
    }
    //добавление в конец
    append(value) {
        let newNode = new DoublyLinkedListNode(value,null,this.tail);
        if (this.tail) this.tail.next = newNode;
        this.tail = newNode;
        if (!this.head) this.head = newNode;
        this.length++;
    }
    //удаление
    delete(value) {
        if (!this.head) return null;

        let deletedNode = null;
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value === value) {
                deletedNode = currentNode;
                switch (deletedNode) {
                    case this.head:
                        this.head = deletedNode.next;
                        this.head.previous = null;
                        break;
                    case this.tail:
                        this.tail = deletedNode.previous;
                        this.tail.next = null;
                        break;
                    default:
                        const previousNode = deletedNode.previous;
                        const nextNode = deletedNode.next;
                        previousNode.next = nextNode;
                        nextNode.previous = previousNode;
                }
                this.length--;
            }
            currentNode = currentNode.next;
        }
    }
}

console.log('add');
console.log('');
let a11 = [11,22,33,44,11,44,44,44];
console.log('a11 = ' + a11 + '; a11 length = ' + a11.length);
let a22 = ['aa','bb','cc','dd','aa','bb','dd','dd'];
console.log('a22 = ' + a22 + '; a22 length = ' + a22.length);
let dll = new DoublyLinkedList;
dll.forEach((i) => {console.log(i)});
console.log('length = ' + dll.length);

a11.forEach((i) => {
    dll.prepend(i);
    console.log('dll.length = ' + dll.length);
});

a22.forEach((i) => {
    dll.append(i);
    console.log('dll.length = ' + dll.length);
});

dll.forEach((i) => {console.log(i)});
console.log('length = ' + dll.length);

//delete
console.log('------------------------------------------------');
console.log('delete');
console.log('');
ditem = 'dd';
dll.delete(ditem);
console.log('dll.delete ' + ditem); 
dll.forEach((i) => {console.log(i)});
console.log('length = ' + dll.length);

ditem = 44;
dll.delete(ditem);
console.log('dll.delete ' + ditem); 
dll.forEach((i) => {console.log(i)});
console.log('length = ' + dll.length);

ditem = 'aa';
dll.delete(ditem);
console.log('dll.delete ' + ditem); 
dll.forEach((i) => {console.log(i)});
console.log('length = ' + dll.length);

//find
console.log('------------------------------------------------');
console.log('find');
console.log('');
fitem = 'bb';
console.log('dll.fitem ' + fitem + '; result = ' + dll.find(fitem));

fitem = 22;
console.log('dll.fitem ' + fitem + '; result = ' + dll.find(fitem));

fitem = 'ss';
console.log('dll.fitem ' + fitem + '; result = ' + dll.find(fitem));

//change
console.log('------------------------------------------------');
console.log('change');
console.log('');
ovl = 22;
nvl = 'dbox1';
console.log('ovl = ' + ovl + '; nvl = ' + nvl);
dll.change(ovl,nvl);
dll.forEach((i) => {console.log(i)});
console.log('length = ' + dll.length);

ovl = 'bb';
nvl = 'dbox2';
console.log('ovl = ' + ovl + '; nvl = ' + nvl);
if(dll.change(ovl,nvl)){
    console.log('Change Done');
} else {
    console.log('Change False');
};
dll.forEach((i) => {console.log(i)});
console.log('length = ' + dll.length);

ovl = 'ss';
nvl = 'dccbox2';
console.log('ovl = ' + ovl + '; nvl = ' + nvl);
if(dll.change(ovl,nvl)){
    console.log('Change Done');
} else {
    console.log('Change False');
};
dll.forEach((i) => {console.log(i)});
console.log('length = ' + dll.length);
