/* 
Heap sort is a comparison-based sorting technique based on Binary Heap data structure.
It is similar to the selection sort where we first find the minimum element and place 
the minimum element at the beginning. Repeat the same process for the remaining elements.

e.g.
for the following list [10, 80, 40, 90, 30, 50, 70]

1. Build a max heap from the input data => [90, 80, 70, 10, 30, 50, 40]
2. At this point, the maximum element is stored at the root of the heap.
   Replace it with the last item of the heap followed by reducing the size
   of the heap by 1. Finally, heapify the root of the tree. => [40, 80, 70, 10, 30, 50] -> [80, 40, 70, 10, 30, 50]
2b. Repeat while the size of the heap is greater than 1. => [50, 40, 70, 10, 30] -> [70, 40, 50, 10, 30]
2c. Repeat while the size of the heap is greater than 1. => [30, 40, 50, 10] -> [50, 40, 30, 10]
2d. Repeat while the size of the heap is greater than 1. => [10, 40, 30] -> [40, 10, 30]
2d. Repeat while the size of the heap is greater than 1. => [30, 10] -> [30, 10]

---------------------------------------------------------

Complexity:
=> O(n*log(n))

---------------------------------------------------------

Pros
=> time efficient (time increases logarithmically instead of exponentially)
=> memory usage is minimal
=> simple to understand

Cons 
=> heap sort is costly
=> is unstable (might rearrange the relative order)
=> not efficient when working with highly complex data
*/

function sort(array) {
  let N = array.length;

  console.log("array:", array);

  // Build heap (rearrange array)
  for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
    heapify(array, N, i);
  }

  console.log("heap:", array);

  // One by one extract an element from heap
  for (let i = N - 1; i > 0; i--) {
    // Move current root to end
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    // call max heapify on the reduced heap
    heapify(array, i, 0);
  }
  return array;
}

// To heapify a subtree rooted with node index which is
// an index in array[]. N is size of heap
function heapify(array, N, index) {
  let largest = index; // Initialize largest as root
  let left = 2 * index + 1;
  let right = 2 * index + 2;

  // If left child is larger than root
  if (left < N && array[left] > array[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < N && array[right] > array[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest != index) {
    let swap = array[index];
    array[index] = array[largest];
    array[largest] = swap;

    // Recursively heapify the affected sub-tree
    heapify(array, N, largest);
  }
}

const array = [10, 80, 40, 90, 30, 50, 70];
console.log(">>>Result:", sort(array)); //returns >>>Result: [10, 30, 40, 50, 70, 80, 90]
