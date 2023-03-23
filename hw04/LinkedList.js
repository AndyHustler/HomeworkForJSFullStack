console.log('------------------------------------------------');
console.log('LinkedList');
console.log('------------------------------------------------');
class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        //this.tail = null;
        this.length = 0;
    }
    //Добавление с начала
    prepend(value) {
        let newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        //if (!this.tail) this.tail = newNode;
        this.length++;
    }
    //добавление в конец
    append(value) {
        let newNode = new LinkedListNode(value);
/*
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
        }
        this.tail.next = newNode;
        this.tail = newNode;
*/
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
        while (this.head.value === value) {
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
        let cou = 0;
        while (current) {
            if(current.value === value){
                cou++;
            };
            current = current.next;
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

console.log('add');
console.log('');
let a1 = [1,2,3,2,3,3];
console.log('a1 = ' + a1 + '; a1 length = ' + a1.length);
let a2 = ['a','b','c','a','c','c'];
console.log('a2 = ' + a2 + '; a2 length = ' + a2.length);
let ll = new LinkedList;

ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

a1.forEach((i) => {
    ll.prepend(i);
    console.log('ll.length = ' + ll.length);
});

a2.forEach((i) => {
    ll.append(i);
    console.log('ll.length = ' + ll.length);
});

ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

//delete
console.log('------------------------------------------------');
console.log('delete');
console.log('');
let ditem = 'c';
ll.delete(ditem);
console.log('ll.delete ' + ditem); 
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

ditem = 3;
ll.delete(ditem);
console.log('ll.delete ' + ditem); 
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

ditem = 'a';
ll.delete(ditem);
console.log('ll.delete ' + ditem); 
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

//find
console.log('------------------------------------------------');
console.log('find');
console.log('');
let fitem = 'b';
console.log('ll.fitem ' + fitem + '; result = ' + ll.find(fitem));

fitem = 2;
console.log('ll.fitem ' + fitem + '; result = ' + ll.find(fitem));

fitem = 'ss';
console.log('ll.fitem ' + fitem + '; result = ' + ll.find(fitem));

//change
console.log('------------------------------------------------');
console.log('change');
console.log('');
let ovl = 2;
let nvl = 'box1';
console.log('ovl = ' + ovl + '; nvl = ' + nvl);
ll.change(ovl,nvl);
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);

ovl = 'b';
nvl = 'box2';
console.log('ovl = ' + ovl + '; nvl = ' + nvl);
ll.change(ovl,nvl);
ll.forEach((i) => {console.log(i)});
console.log('length = ' + ll.length);
