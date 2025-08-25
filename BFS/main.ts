// src/main.ts

import { Binary_Node, N_Node } from './classes';
import { BFSBinaryTree, BFSNaryTree } from './bfs';

// Create a binary tree
const binaryRoot = new Binary_Node<number>(1);
binaryRoot.left = new Binary_Node<number>(2);
binaryRoot.right = new Binary_Node<number>(3);
binaryRoot.left.left = new Binary_Node<number>(4);
binaryRoot.left.right = new Binary_Node<number>(5);

// Create an N-ary tree
const naryRoot = new N_Node<number>(1);
const child2 = new N_Node<number>(2);
const child3 = new N_Node<number>(3);
const child4 = new N_Node<number>(4);

naryRoot.addChild(child2);
naryRoot.addChild(child3);
naryRoot.addChild(child4);
child2.addChild(new N_Node<number>(5));
child2.addChild(new N_Node<number>(6));

// Run BFS
console.log('Binary Tree BFS:', BFSBinaryTree(binaryRoot));
console.log('N-ary Tree BFS:', BFSNaryTree(naryRoot));
