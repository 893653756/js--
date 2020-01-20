/**
 * 数据结构---链表
 * 每个元素由一个存储元素本身的 "节点" 和一个 "指向下一个元素的引用"(也称指针或链接)组成
 * 相对于传统的数组, 链表的一个好处在于, 添加或移除元素的时候不需要移动其他元素
 * 想访问链表中间的一个元素，需要从起点(表头)开始迭代列表直到找到所需的元素
 */

// 节点
class Node {
    constructor(el) {
        this.el = el;
        this.next = null;
    }
}

// 链表
class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    // 添加元素
    append(el) {
        const node = new Node(el);
        let cur = null;
        // 是否为空
        if (this.head === null) {
            this.head = node;
        } else {
            cur = this.head;
            while (cur.next) {
                cur = cur.next
            }
            cur.next = node;
        }
        this.length++;
    }
    // 在任意位置插入
    insert(pos, el) {
        if (pos >= 0 && pos <= this.length) {
            const node = new Node(el);
            let cur = this.head;
            let pre = null;
            let index = 0;
            if (pos === 0) {
                node.next = cur;
                this.head = node;
            } else {
                while (index < pos) {
                    index++;
                    // pre node next
                    pre = cur; // 前一个
                    cur = cur.next; // 后一个
                }
                pre.next = node;
                node.next = cur;
            }
            this.length++;
            return true
        } else {
            throw new Error("指定位置不在链表范围内");
        }
    }
    // 删除指定位置
    removeAt(pos) {
        if (pos >= 0 && pos <= this.length) {
            let cur = this.head;
            let pre = null;
            let index = 0;
            if (pos === 0) {
                this.head = cur.next;
            } else {
                while(index < cur) {
                    index++;
                    pre = cur;
                    cur = cur.next;
                }
                pre.next = cur.next;
            }
            this.length--;
        }else {
            throw new Error("指定位置不在链表范围内");
        }
    }
    // 寻找元素下标
    findIndex (el) {
        let cur = this.head;
        let index = 0;
        while(cur) {
            if (el === cur.el) {
                return index;
            }
            index++;
            cur = cur.next;
        }
        return -1;
    }
    // 是否为空链表
    get isEmpty() {
        return this.length > 0 ? false : true;
    }
    // 链表长度
    get size() {
        return this.length;
    }
    // 转换成字符串
    toString() {
        let cur = this.head;
        let str = "";
        while(cur) {
            str += `${cur.el}`;
            cur = cur.next;
        }
        return str;
    }
}