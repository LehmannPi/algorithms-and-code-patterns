export class N_Node<T> {
  value: T;
  children: N_Node<T>[];

  constructor(value: T, children?: N_Node<T>[]) {
    this.value = value;
    this.children = children === undefined ? [] : children;
  }

  addChild(child: N_Node<T>): void {
    this.children.push(child);
  }
}

export class Binary_Node<T> {
  value: T;
  left: Binary_Node<T> | null;
  right: Binary_Node<T> | null;

  constructor(value: T, left?: Binary_Node<T>, right?: Binary_Node<T>) {
    this.value = value;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
