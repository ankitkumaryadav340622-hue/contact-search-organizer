
/* =========================================
   CONTACTHUB - MERGE SORT
   ========================================= */

/*
    Algorithm: Merge Sort

    Input: Array of contact objects
    Output: Sorted array of contacts

    Time Complexity: O(n log n)
    Auxiliary Space Complexity: O(n)
*/


// Merge two sorted arrays
function merge(left, right, order) {

    const result = [];

    let i = 0;
    let j = 0;

    // Compare names from both arrays
    while (i < left.length && j < right.length) {

        const comparison = left[i].name.localeCompare(
            right[j].name,
            undefined,
            { sensitivity: "base" }
        );

        let shouldTakeLeft;

        if (order === "asc") {
            shouldTakeLeft = comparison <= 0;
        } else {
            shouldTakeLeft = comparison >= 0;
        }

        if (shouldTakeLeft) {

            result.push(left[i]);
            i++;

        } else {

            result.push(right[j]);
            j++;

        }
    }

    // Add remaining elements
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}


// Main Merge Sort function
function mergeSort(contactArray, order = "asc") {

    // Base condition
    if (contactArray.length <= 1) {
        return [...contactArray];
    }

    // Divide array into two halves
    const middle = Math.floor(contactArray.length / 2);

    const left = contactArray.slice(0, middle);
    const right = contactArray.slice(middle);

    // Recursively sort both halves
    const sortedLeft = mergeSort(left, order);
    const sortedRight = mergeSort(right, order);

    // Merge sorted halves
    return merge(sortedLeft, sortedRight, order);
}
