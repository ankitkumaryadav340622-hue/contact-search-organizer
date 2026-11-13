
/* =========================================
   CONTACTHUB - AUTOMATED DSA TESTING
   ========================================= */

const testResults = document.getElementById("testResults");
const summary = document.getElementById("summary");
const runTestsBtn = document.getElementById("runTestsBtn");

let passedTests = 0;
let failedTests = 0;


// Test assertion
function assert(condition, message) {

    if (!condition) {
        throw new Error(message);
    }
}


// Execute individual test
function runTest(testName, testFunction) {

    const result = document.createElement("div");
    result.className = "test-item";

    const name = document.createElement("span");
    name.textContent = testName;

    const status = document.createElement("span");

    try {

        testFunction();

        passedTests++;

        status.textContent = "PASS";
        status.className = "status pass";

    } catch (error) {

        failedTests++;

        status.textContent = "FAIL";
        status.className = "status fail";

        console.error(testName, error);

    }

    result.append(name, status);

    testResults.appendChild(result);
}


// Sample contacts
function sampleContacts() {

    return [
        {
            id: "1",
            name: "Rahul Sharma",
            phone: "9876543210",
            email: "rahul@gmail.com",
            category: "Friends"
        },
        {
            id: "2",
            name: "Aman Verma",
            phone: "9123456780",
            email: "aman@gmail.com",
            category: "Work"
        },
        {
            id: "3",
            name: "Shivam Patel",
            phone: "9988776655",
            email: "shivam@gmail.com",
            category: "Family"
        }
    ];
}


// MAIN TEST SUITE
function executeTests() {

    passedTests = 0;
    failedTests = 0;

    testResults.replaceChildren();

    // TEST 1: Linear Search by name
    runTest("Linear Search - Find existing name", function() {

        const data = sampleContacts();

        const result = linearSearch(data, "Rahul");

        assert(result.length === 1, "Expected one result.");

        assert(
            result[0].name === "Rahul Sharma",
            "Incorrect contact returned."
        );

    });


    // TEST 2: Linear Search by phone
    runTest("Linear Search - Find by phone", function() {

        const result = linearSearch(
            sampleContacts(),
            "9123456780"
        );

        assert(result.length === 1, "Phone search failed.");

        assert(
            result[0].name === "Aman Verma",
            "Wrong contact returned."
        );

    });


    // TEST 3: Case insensitive search
    runTest("Linear Search - Case insensitive", function() {

        const result = linearSearch(
            sampleContacts(),
            "rahul"
        );

        assert(result.length === 1, "Case insensitive search failed.");

    });


    // TEST 4: Unavailable contact
    runTest("Linear Search - Contact not found", function() {

        const result = linearSearch(
            sampleContacts(),
            "Unknown"
        );

        assert(result.length === 0, "Expected zero results.");

    });


    // TEST 5: Empty array
    runTest("Linear Search - Empty array", function() {

        const result = linearSearch([], "Rahul");

        assert(result.length === 0, "Empty array should return no results.");

    });


    // TEST 6: Merge Sort A-Z
    runTest("Merge Sort - A to Z", function() {

        const result = mergeSort(sampleContacts(), "asc");

        const expected = [
            "Aman Verma",
            "Rahul Sharma",
            "Shivam Patel"
        ];

        assert(
            JSON.stringify(result.map(c => c.name)) ===
            JSON.stringify(expected),
            "A-Z sorting failed."
        );

    });


    // TEST 7: Merge Sort Z-A
    runTest("Merge Sort - Z to A", function() {

        const result = mergeSort(sampleContacts(), "desc");

        const expected = [
            "Shivam Patel",
            "Rahul Sharma",
            "Aman Verma"
        ];

        assert(
            JSON.stringify(result.map(c => c.name)) ===
            JSON.stringify(expected),
            "Z-A sorting failed."
        );

    });


    // TEST 8: Empty array sorting
    runTest("Merge Sort - Empty array", function() {

        const result = mergeSort([], "asc");

        assert(result.length === 0, "Empty sorting failed.");

    });


    // TEST 9: Original array preservation
    runTest("Merge Sort - Original array unchanged", function() {

        const data = sampleContacts();

        const originalFirst = data[0].name;

        mergeSort(data, "asc");

        assert(
            data[0].name === originalFirst,
            "Original array was modified."
        );

    });


    // TEST 10: Contact validation
    runTest("Validation - Invalid phone number", function() {

        const result = validateContact(
            "Rahul",
            "12345",
            "rahul@gmail.com",
            "Friends"
        );

        assert(result !== null, "Invalid phone was accepted.");

    });


    // TEST 11: Empty name
    runTest("Validation - Empty name", function() {

        const result = validateContact(
            "",
            "9876543210",
            "rahul@gmail.com",
            "Friends"
        );

        assert(result !== null, "Empty name was accepted.");

    });


    // TEST 12: Add and duplicate prevention
    runTest("Contact Management - Add and duplicate", function() {

        contacts = [];

        const first = addContact(
            "Rahul Sharma",
            "9876543210",
            "rahul@gmail.com",
            "Friends"
        );

        assert(first.success, "Valid contact was not added.");

        const second = addContact(
            "Another Person",
            "9876543210",
            "another@gmail.com",
            "Work"
        );

        assert(!second.success, "Duplicate phone was accepted.");

        assert(contacts.length === 1, "Incorrect contact count.");

        contacts = [];

    });


    // TEST 13: Update contact
    runTest("Contact Management - Update", function() {

        contacts = [];

        const added = addContact(
            "Rahul Sharma",
            "9876543210",
            "rahul@gmail.com",
            "Friends"
        );

        const id = contacts[0].id;

        const updated = updateContact(
            id,
            "Rahul Kumar",
            "9876543210",
            "rahul@gmail.com",
            "Work"
        );

        assert(added.success, "Initial contact addition failed.");

        assert(updated.success, "Contact update failed.");

        assert(
            contacts[0].name === "Rahul Kumar",
            "Updated name is incorrect."
        );

        contacts = [];

    });


    // TEST 14: Delete contact
    runTest("Contact Management - Delete", function() {

        contacts = [];

        addContact(
            "Rahul Sharma",
            "9876543210",
            "rahul@gmail.com",
            "Friends"
        );

        const id = contacts[0].id;

        const deleted = deleteContact(id);

        assert(deleted, "Contact deletion failed.");

        assert(contacts.length === 0, "Contact still exists.");

        contacts = [];

    });


    // FINAL SUMMARY
    summary.textContent =
        "Passed: " + passedTests +
        " | Failed: " + failedTests +
        " | Total: " + (passedTests + failedTests);

    summary.style.color =
        failedTests === 0 ? "#15976b" : "#e34d59";

}


// Run button
runTestsBtn.addEventListener("click", executeTests);


// Automatically execute tests when page opens
executeTests();
