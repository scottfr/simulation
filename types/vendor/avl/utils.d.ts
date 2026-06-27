/**
 * Prints tree horizontally
 * @param  {Node}                       root
 * @param  {function(node:Node):String} [printNode]
 * @return {String}
 */
export function print(root: Node, printNode?: (n: any) => any): string;
/**
 * Is the tree balanced (none of the subtrees differ in height by more than 1)
 * @param  {Node}    root
 * @return {Boolean}
 */
export function isBalanced(root: Node): boolean;
export function loadRecursive(parent: any, keys: any, values: any, start: any, end: any): {
    key: any;
    data: any;
    parent: any;
} | null;
export function markBalance(node: any): any;
export function sort(keys: any, values: any, left: any, right: any, compare: any): void;
