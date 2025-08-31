import { BinaryTreeNode, NaryTreeNode } from './classes';

const binaryRoot = new BinaryTreeNode<number>(1);
binaryRoot.left = new BinaryTreeNode<number>(2);
binaryRoot.right = new BinaryTreeNode<number>(3);
binaryRoot.left.left = new BinaryTreeNode<number>(4);
binaryRoot.left.right = new BinaryTreeNode<number>(5);

// Create an N-ary tree
const naryRoot = new NaryTreeNode<number>(1);
const child2 = new NaryTreeNode<number>(2);
const child3 = new NaryTreeNode<number>(3);
const child4 = new NaryTreeNode<number>(4);

naryRoot.addChild(child2);
naryRoot.addChild(child3);
naryRoot.addChild(child4);
child2.addChild(new NaryTreeNode<number>(5));
child2.addChild(new NaryTreeNode<number>(6));

// Run DFS - preorder
// console.log('Binary Tree BFS:', BFSBinaryTree(binaryRoot));
// console.log('N-ary Tree BFS:', BFSNaryTree(naryRoot));
