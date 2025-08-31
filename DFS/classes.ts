export class NaryTreeNode<T> {
  value: T;
  children: NaryTreeNode<T>[];
  constructor(value: T, children?: NaryTreeNode<T>[]) {
    this.value = value;
    this.children = children === undefined ? [] : children;
  }
  addChild(child: NaryTreeNode<T>): void {
    this.children.push(child);
  }
}

export class BinaryTreeNode<T> {
  value: T;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;

  constructor(
    value: T,
    left?: BinaryTreeNode<T> | null,
    right?: BinaryTreeNode<T> | null
  ) {
    this.value = value;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
