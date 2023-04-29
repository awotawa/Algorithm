/* 
QuickSort is a sorting algorithm based on the Divide and Conquer algorithm 
that picks an element as a pivot and partitions the given array around 
the picked pivot by placing the pivot in its correct position in the sorted array.

e.g.
for the following list [10, 80, 40, 90, 30, 50, 70]

1. Pick a pivot => let's pick the last element for instance (70)
2. Separate the list around the pivot => [10, 40, 30, 50] & [80, 90]
3. Repeat the process in each lists => {[10, 40, 30] & [] & pivot = (50)} & {[80] & [] & pivot = (90)}
3b. Repeat the process => [10] & [40] & pivot = (30)

---------------------------------------------------------

Complexity:
- best case => O(n*log(n))
- worst case => O(n^2) 
- average => O(n*log(n))

---------------------------------------------------------

Pros
=> divide-and-conquer algorithm
=> efficient on large data sets
=> low overhead, requires small amount of memory to function

Cons 
=> worst case complexity O(n^2), often due to poor pivot choice
=> not good for small data sets
=> not stable sort (not keeping relative order)
*/

function partition(array, startingIndex, endingIndex) {
  const pivot = array[endingIndex];

  let indexOfSmallerElement = startingIndex - 1; //indicates the right position of pivot found so far

  for (let i = startingIndex; i <= endingIndex - 1; i++) {
    if (array[i] < pivot) {
      indexOfSmallerElement++;
      //swap array[indexOfSmallerElement] and array[i]
      const temporaryVariable = array[i];
      array[i] = array[indexOfSmallerElement];
      array[indexOfSmallerElement] = temporaryVariable;
    }
  }
  //swap array[indexOfSmallerElement + 1] and array[endingIndex]
  const temporaryVariable = array[endingIndex];
  array[endingIndex] = array[indexOfSmallerElement + 1];
  array[indexOfSmallerElement + 1] = temporaryVariable;
  return indexOfSmallerElement + 1;
}

function quicksort(array, startingIndex, endingIndex) {
  if (startingIndex < endingIndex) {
    const partitioningIndex = partition(array, startingIndex, endingIndex);
    quicksort(array, startingIndex, partitioningIndex - 1); //Before partitioningIndex
    quicksort(array, partitioningIndex + 1, endingIndex); //After partitioningIndex
  }
  return array;
}

const array = [10, 80, 40, 90, 30, 50, 70];
console.log(">>>Result:", quicksort(array, 0, array.length - 1)); //returns >>>Result: [10, 30, 40, 50, 70, 80, 90]
