class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key === null) {
            this.key = key;
            this.value = value;
        } else if (key < this.key) {

            if (this.left === null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        } else {
            if (this.right === null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        if (this.key === key) {
            return this.value;
        }

        else if (key < this.key && this.left) {
            return this.left.find(key);
        }

        else if (key > this.key && this.right) {
            return this.right.find(key);
        }

        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key === key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            } else if (this == this.parent.right) {
                this.parent.right = node;
            }
            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

function tree(t) {
    if (!t) {
        return 0;
    }
    console.log(tree(t.left) + t.value + tree(t.right));
}

function height(tree) {
    if (tree.left == null && tree.right === null) {
        return 1;
    }
    let left = 0;
    let right = 0;

    if (tree.left) {
        left = 1 + height(tree.left);
    }
    if (tree.right) {
        right = 1 + height(tree.right);
    }

    if (left < right) {
        return right;
    } else {
        return left;
    }

}

function isBST(tree) {
    if (tree.left > tree.value || tree.right < tree.value) {
        return false;
    }
    if (tree.left == null && tree.right == null) {
        return true;
    }

    let right = isBST(tree.right);
    let left = isBST(tree.left);

    if (right == false || left == false) {
        return false;
    }
    else {
        return true;
    }
}

function main() {
    let newTree = new BinarySearchTree();

    // newTree.insert(3);
    // console.log(height(newTree));
    // newTree.insert(1);
    // console.log(height(newTree));
    // newTree.insert(4);
    // console.log(height(newTree));
    // newTree.insert(6);
    // console.log(height(newTree));
    // newTree.insert(9);
    // console.log(height(newTree));
    // newTree.insert(2);
    // console.log(height(newTree));
    // newTree.insert(5);
    // console.log(height(newTree));
    // newTree.insert(7);
    // console.log(height(newTree));

    // height(newTree);
    // console.log(height(newTree));

    let BSTwrong = new BinarySearchTree(2);
    let smallNode = new BinarySearchTree(1);
    let largeNode = new BinarySearchTree(3);
    BSTwrong.right = smallNode;
    BSTwrong.left = largeNode;
    // console.log(isBST(problem6True())); // true
    console.log(isBST(BSTwrong)); // false
    let deepBSTWrong = new BinarySearchTree(2);
    deepBSTWrong.left = smallNode;
    deepBSTWrong.right = largeNode;
    deepBSTWrong.left.left = largeNode;
    deepBSTWrong.left.right = new BinarySearchTree(2);
    // console.log(isBST(deepBSTWrong)); // false
}

main();