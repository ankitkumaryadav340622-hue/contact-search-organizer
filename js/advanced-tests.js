
/* =========================================
   CONTACTHUB - ADVANCED PERFORMANCE TESTS
   ========================================= */

const performanceResults =
    document.getElementById("performanceResults");

const summary =
    document.getElementById("summary");

const storageResults =
    document.getElementById("storageResults");

const STORAGE_TEST_KEY =
    "contactHubPerformanceTest";


// Generate sample contacts
function generateDataset(size) {

    const dataset = [];

    for (let i = 1; i <= size; i++) {

        dataset.push({

            id: String(i),

            name: "Contact " +
                String(size - i + 1).padStart(5, "0"),

            phone: String(9000000000 + i),

            email: "contact" + i + "@example.com",

            category: ["Work", "Friends", "Family"][i % 3]

        });

    }

    return dataset;
}


// Check if array is alphabetically sorted
function isSorted(data) {

    for (let i = 1; i < data.length; i++) {

        const comparison = data[i - 1].name.localeCompare(
            data[i].name,
            undefined,
            { sensitivity: "base" }
        );

        if (comparison > 0) {
            return false;
        }

    }

    return true;
}


// Measure execution time
function measureTime(callback) {

    const start = performance.now();

    const result = callback();

    const end = performance.now();

    return {
        result: result,
        time: end - start
    };
}


// Display performance results
function runPerformanceTests() {

    performanceResults.replaceChildren();

    const datasetSizes = [100, 500, 1000];

    let allPassed = true;

    datasetSizes.forEach(size => {

        const dataset = generateDataset(size);

        // LINEAR SEARCH
        const searchMeasurement = measureTime(function() {

            return linearSearch(
                dataset,
                "Contact 00001"
            );

        });

        const searchResults = searchMeasurement.result;

        const searchCorrect =
            searchResults.length === 1 &&
            searchResults[0].name === "Contact 00001";


        // MERGE SORT
        const sortMeasurement = measureTime(function() {

            return mergeSort(dataset, "asc");

        });

        const sortedData = sortMeasurement.result;

        const sortingCorrect =
            sortedData.length === size &&
            isSorted(sortedData);


        const row = document.createElement("tr");

        const values = [

            size,

            searchMeasurement.time.toFixed(4),

            sortMeasurement.time.toFixed(4),

            searchCorrect && sortingCorrect
                ? "PASS"
                : "FAIL"

        ];

        values.forEach((value, index) => {

            const cell = document.createElement("td");

            cell.textContent = value;

            if (index === 3) {

                cell.className =
                    value === "PASS" ? "pass" : "fail";

            }

            row.appendChild(cell);

        });

        performanceResults.appendChild(row);

        if (!searchCorrect || !sortingCorrect) {
            allPassed = false;
        }

    });


    summary.textContent = allPassed
        ? "All performance dataset correctness checks passed!"
        : "Some correctness checks failed. Inspect the results.";

    summary.className = allPassed ? "pass" : "fail";

}


// Test LocalStorage
function runStorageTest() {

    storageResults.replaceChildren();

    const testDataset = generateDataset(100);

    const test = document.createElement("div");

    try {

        const startSave = performance.now();

        localStorage.setItem(
            STORAGE_TEST_KEY,
            JSON.stringify(testDataset)
        );

        const saveTime = performance.now() - startSave;


        const startLoad = performance.now();

        const storedData = JSON.parse(
            localStorage.getItem(STORAGE_TEST_KEY)
        );

        const loadTime = performance.now() - startLoad;


        const correct =
            Array.isArray(storedData) &&
            storedData.length === 100 &&
            storedData[0].name === testDataset[0].name;


        test.textContent = correct
            ? "PASS - 100 contacts saved and retrieved successfully."
            : "FAIL - Stored data does not match.";


        test.className = correct ? "pass" : "fail";


        const timings = document.createElement("p");

        timings.textContent =
            "Save time: " + saveTime.toFixed(4) +
            " ms | Read time: " + loadTime.toFixed(4) + " ms";


        timings.style.marginTop = "10px";

        storageResults.append(test, timings);


    } catch (error) {

        test.textContent =
            "FAIL - LocalStorage test error: " + error.message;

        test.className = "fail";

        storageResults.appendChild(test);

    } finally {

        // Remove only our temporary testing key
        localStorage.removeItem(STORAGE_TEST_KEY);

    }

}


// Button events
document.getElementById("runPerformanceBtn")
    .addEventListener("click", runPerformanceTests);

document.getElementById("runStorageBtn")
    .addEventListener("click", runStorageTest);
