console.log('------------------------------------------------');
console.log('LinkedList');
console.log('------------------------------------------------');
var LinkedListNode = /** @class */ (function () {
    function LinkedListNode(value, next) {
        if (next === void 0) { next = null; }
        this.value = value;
        this.next = next;
    }
    return LinkedListNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
        this.length = 0;
    }
    //Добавление с начала
    LinkedList.prototype.prepend = function (value) {
        var newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        this.length++;
    };
    //добавление в конец
    LinkedList.prototype.append = function (value) {
        var newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
        }
        else {
            var current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    };
    //удаление
    LinkedList.prototype.delete = function (value) {
        if (!this.head)
            return;
        var deletedNode = null;
        while (this.head.value === value) {
            this.head = this.head.next;
            this.length--;
        }
        var currentNode = this.head;
        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                    this.length--;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
    };
    //обход
    LinkedList.prototype.forEach = function (callback) {
        var current = this.head;
        while (current) {
            callback(current);
            current = current.next;
        }
    };
    //поиск
    LinkedList.prototype.find = function (value) {
        var current = this.head;
        var cou = 0;
        while (current) {
            if (current.value === value) {
                cou++;
            }
            ;
            current = current.next;
        }
        return cou;
    };
    //изменение
    LinkedList.prototype.change = function (value, newValue) {
        if (!this.head)
            return null;
        var currentNode = this.head;
        var done = false;
        while (currentNode) {
            if (currentNode.value === value) {
                currentNode.value = newValue;
                done = true;
            }
            currentNode = currentNode.next;
        }
        return done;
    };
    return LinkedList;
}());
console.log('add');
console.log('');
var a1 = [1, 2, 3, 2, 3, 3];
console.log('a1 = ' + a1 + '; a1 length = ' + a1.length);
var a2 = ['a', 'b', 'c', 'a', 'c', 'c'];
console.log('a2 = ' + a2 + '; a2 length = ' + a2.length);
var ll = new LinkedList;
ll.forEach(function (i) { console.log(i); });
console.log('length = ' + ll.length);
a1.forEach(function (i) {
    ll.prepend(i);
    console.log('ll.length = ' + ll.length);
});
a2.forEach(function (i) {
    ll.append(i);
    console.log('ll.length = ' + ll.length);
});
ll.forEach(function (i) { console.log(i); });
console.log('length = ' + ll.length);
//delete
console.log('------------------------------------------------');
console.log('delete');
console.log('');
var ditem = 'c';
ll.delete(ditem);
console.log('ll.delete ' + ditem);
ll.forEach(function (i) { console.log(i); });
console.log('length = ' + ll.length);
ditem = 3;
ll.delete(ditem);
console.log('ll.delete ' + ditem);
ll.forEach(function (i) { console.log(i); });
console.log('length = ' + ll.length);
ditem = 'a';
ll.delete(ditem);
console.log('ll.delete ' + ditem);
ll.forEach(function (i) { console.log(i); });
console.log('length = ' + ll.length);
//find
console.log('------------------------------------------------');
console.log('find');
console.log('');
var fitem = 'b';
console.log('ll.fitem ' + fitem + '; result = ' + ll.find(fitem));
fitem = 2;
console.log('ll.fitem ' + fitem + '; result = ' + ll.find(fitem));
fitem = 'ss';
console.log('ll.fitem ' + fitem + '; result = ' + ll.find(fitem));
//change
console.log('------------------------------------------------');
console.log('change');
console.log('');
var ovl = 2;
var nvl = 'box1';
console.log('ovl = ' + ovl + '; nvl = ' + nvl);
ll.change(ovl, nvl);
ll.forEach(function (i) { console.log(i); });
console.log('length = ' + ll.length);
ovl = 'b';
nvl = 'box2';
console.log('ovl = ' + ovl + '; nvl = ' + nvl);
ll.change(ovl, nvl);
ll.forEach(function (i) { console.log(i); });
console.log('length = ' + ll.length);
