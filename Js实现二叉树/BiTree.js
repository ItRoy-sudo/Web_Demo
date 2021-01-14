class BiTreeNode
{
    constructor(num) {
        this.data=num;
        this.leftChild=null;
        this.rightChild=null;
    }
}

class BiTree
{
    constructor() {
        this.root=null;
    }
    insertNode(num){
        let node=new BiTreeNode(num);
        let temp=this.root;
        let parentnode=null;
        if(this.root==null){
            this.root=node;
        }else{
            while (true){
                parentnode=temp;
                if(num<temp.data){
                    temp=temp.leftChild;
                    if(temp==null){
                        parentnode.leftChild=node;
                        break;
                    }
                }else{
                    temp=temp.rightChild;
                    if(temp==null){
                        parentnode.rightChild=node;
                        break;
                    }
                }
            }
        }
    }
    preOrder(node){
        if(node!=null){
            console.log(node.data+" ");
            this.preOrder(node.leftChild);
            this.preOrder(node.rightChild);
        }
    }
}

let tree=new BiTree();
tree.insertNode(19);
tree.insertNode(21);
tree.insertNode(17);
tree.insertNode(10);
tree.insertNode(8);
tree.insertNode(25);
tree.insertNode(23);
tree.preOrder(this.root);
