/*
Udemy JavaScript Algorithms and Data Structures Masterclass --- Heaps

Heaps are a kind of tree.
Will do min and max heaps.
What is a binary heap?  Similar to BST, but there is no order to the left or right  The rule is that the children must be smaller than the parents.  Each parent has a most two children.
Binary heaps should be as compact as possible.  Every left and right should be filled before moving down another level.
There is no implied relationship between the siblings other than the fact that they are smaller than their parent.
Binary heaps are used to implement priority queues and traverse graphs.
The left child gets added first.

You can store a binary heap in an array.
For any index of an array n...
The left child is stored at 2n + 1
The right child is at 2n + 2

To find a parent of a child node at index n...
It's parent is at index (n-1)/2 floored
*/

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    let node = new Node(val, priority);
    this.values.push(node);
    this.bubbleUp();
  }

  bubbleUp () {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while(idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if(element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue () {
    const min = this.values[0];
    const end = this.values.pop();
    if(this.values.length > 0) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleDown () {
    let idx = 0;
    const length = this.values.length;
    let element = this.values[0];
    while(true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if(leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if(leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if(rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if(
          (swap === null && rightChild.priority < element.priority) || 
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if(swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap
    }
  }
}

// let test = new PriorityQueue;
// test.enqueue('noder', 10);
// test.enqueue('noderer', 4);
// test.enqueue('a thing', 27);
// test.enqueue('oooh', 2);
// test.dequeue();
// console.log(test);
