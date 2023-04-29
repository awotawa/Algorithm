/* 
Merge sort is defined as a sorting algorithm that works by dividing 
an array into smaller subarrays, sorting each subarray, and then merging 
the sorted subarrays back together to form the final sorted array.

e.g.
for the following list [10, 80, 40, 90, 30, 50, 70]

1. Check if left index of array (0) is less than the right index (6),
   if yes then calculate its mid point => 0 + Math.floor((6-0)/2) -> (3)
2. Separate the array in two around the mid point => [10, 80, 40, 90] & [30, 50, 70]
3. Repeat process (1 & 2) until further division is not possible => ([10, 80] & [40, 90]) & ([30, 50] & [70])
3b. Repeat process => ([10] & [80]) & ([40] & [90]) & ([30] & [50])
4. Start merging the elements based on comparison of size elements => ([10, 80] & [40, 90]) & ([30, 50] & [70])
4b. Continue merging => [10, 40, 80, 90] & [30, 50, 70]
4c. Continue merging => [10, 30, 40, 50, 70, 80, 90]

---------------------------------------------------------

Complexity:
=> O(n*log(n))

---------------------------------------------------------

Pros
=> stable sorting algorithm
=> complexity is the same even in worst case scenario
=> parallelizable algorithm (take advantage of multiple processor or threads)
=> memory efficient
=> versatile on different range of data types (integers, floating points, strings)
=> adaptable to different input (partially sorted, nearly sorted or completely unsorted data)

Cons
=> space complexity to store merged sub-arrays during sorting process
=> recursive algorithm
=> not in-place (requires additional memory to store sorted data)
=> not good for small data sets
=> harder to implement than other algorithms
*/

function merge(array, startingIndex, midPointIndex, endingIndex) {
  const leftArraySize = midPointIndex - startingIndex + 1;
  const rightArraySize = endingIndex - midPointIndex;

  //create temporary arrays
  //   const leftArray = array.slice(startingIndex, leftArraySize);
  //   const rightArray = array.slice(midPointIndex + 1);
  const leftArray = new Array(leftArraySize);
  const rightArray = new Array(rightArraySize);

  for (let index = 0; index < leftArraySize; index++) {
    leftArray[index] = array[index + startingIndex];
  }

  for (let index = 0; index < rightArraySize; index++) {
    rightArray[index] = array[midPointIndex + 1 + index];
  }

  console.log("leftArray & rightArray", [leftArray, rightArray]);
  console.log("leftArraySize & rightArraySize", [
    leftArraySize,
    rightArraySize,
  ]);
  console.log("array", array);

  //merge the temporary arrays back
  let indexOfLeftSubArray = 0;
  let indexOfRightSubArray = 0;
  let indexOfMergedSubArray = startingIndex;
  while (
    indexOfLeftSubArray < leftArraySize &&
    indexOfRightSubArray < rightArraySize
  ) {
    console.log("array inside first while", array);
    if (leftArray[indexOfLeftSubArray] <= rightArray[indexOfRightSubArray]) {
      console.log(
        "if",
        `${leftArray[indexOfLeftSubArray]} & ${rightArray[indexOfRightSubArray]}`
      );
      array[indexOfMergedSubArray] = leftArray[indexOfLeftSubArray];
      indexOfLeftSubArray++;
    } else {
      console.log(
        "else",
        `${leftArray[indexOfLeftSubArray]} & ${rightArray[indexOfRightSubArray]}`
      );
      array[indexOfMergedSubArray] = rightArray[indexOfRightSubArray];
      indexOfRightSubArray++;
    }
    indexOfMergedSubArray++;
  }
  console.log("array after first while", array);

  //Copy the remaining elements of leftArray
  while (indexOfLeftSubArray < leftArraySize) {
    array[indexOfMergedSubArray] = leftArray[indexOfLeftSubArray];
    indexOfLeftSubArray++;
    indexOfMergedSubArray++;
  }

  //Copy the remaining elements of rightArray
  while (indexOfRightSubArray < rightArraySize) {
    array[indexOfMergedSubArray] = rightArray[indexOfRightSubArray];
    indexOfRightSubArray++;
    indexOfMergedSubArray++;
  }

  console.log("array before return", array);
  return array;
}

function mergeSort(array, startingIndex, endingIndex) {
  if (startingIndex >= endingIndex) {
    return array;
  }

  let midPointIndex =
    startingIndex + Math.floor((endingIndex - startingIndex) / 2);
  mergeSort(array, startingIndex, midPointIndex);
  mergeSort(array, midPointIndex + 1, endingIndex);
  merge(array, startingIndex, midPointIndex, endingIndex);

  return array;
}

const array = [10, 80, 40, 90, 30, 50, 70];
console.log(">>>Result:", mergeSort(array, 0, array.length - 1)); //returns >>>Result: [10, 30, 40, 50, 70, 80, 90]
