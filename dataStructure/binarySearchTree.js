/**
 * 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。
 * 这些定义有助于我们写出更高效的向/从树中插人、查找和删除节点的算法。
 * 二叉树在计算机科学中的 应用非常广泛。
 * 
 * 二叉搜索树（BST）是二叉树的一种，但是它只允许你在左侧节点存储（比父节点）小的值，
 * 在右侧节点存储（比父节点）大（或者等于）的值
 * 树的遍历方法：先序、中序、后序
 */

/**
 * 节点类 [key: 节点值, left: 左子节点, right: 右子节点]
 */
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

/**
 * 二叉树类
 */
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    // 插入节点值
    insert(key) {
        // 创建节点
        const newNode = new Node(key);
        // 插入函数 (父节点, 带插入节点)
        const insertNode = (node, newNode) => {
            // 比较大小, 判断是左节点还是右节点
            if (newNode.key < node.key) {
                if (node.left) {
                    insertNode(node.left, newNode)
                } else {
                    node.left = newNode;
                }
            } else {
                if (node.right) {
                    insertNode(node.right, newNode);
                } else {
                    node.right = newNode;
                }
            }
        };
        if (this.root) {
            insertNode(this.root, newNode);
        } else {
            this.root = newNode;
        }
    }
    /**
     * 中序遍历
     * 中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。中序遍历的一种应用就是对树进行排序操作
     * 左侧子节点 => 节点本身 => 右侧子节点
     */
    inOrderTraverse(callback) {
        const inOrderTraverseNode = (node, callback) => {
            if (node) {
                inOrderTraverseNode(node.left, callback);
                callback(node.key);
                inOrderTraverseNode(node.right, callback);
            }
        };
        inOrderTraverseNode(this.root, callback);
    }
    // 查找最小值
    min() {
        const minNode = (node) => {
            return node ? (node.left ? minNode(node.left) : node) : null
        };
        return minNode(this.root);
    }
    // 查找最大值
    max() {
        const maxNode = (node) => {
            return node ? (node.right ? maxNode(node.right) : node) : null;
        };
        return maxNode(this.root);
    }
    //查找一个特定的值
    search(k) {
        const searchNode = (node, key) => {
            if (!ndoe) {
                return false;
            }
            if (node.key === key) {
                return node;
            }
            return searchNode(key < node.key ? node.left : node.right, key)
        };
        return (this.root, key)
    }
}