// src/bfs.ts

import { Binary_Node, N_Node } from './classes';

export function BFSBinaryTree<T>(root: Binary_Node<T> | null): T[] {
  if (!root) return [];

  const result: T[] = [];
  const queue: Binary_Node<T>[] = [root];

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current.value);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return result;
}

export function BFSNaryTree<T>(root: N_Node<T> | null): T[] {
  if (!root) return [];

  const result: T[] = [];
  const queue: N_Node<T>[] = [root];

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current.value);

    for (const child of current.children) {
      queue.push(child);
    }
  }

  return result;
}
