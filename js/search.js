
/* =========================================
   CONTACTHUB - LINEAR SEARCH
   ========================================= */

/*
    Algorithm: Linear Search

    Input: Contacts array and search query
    Output: Array containing matching contacts

    Time Complexity: O(n)
    Space Complexity: O(k) for k matching results
*/

function linearSearch(contactArray, query) {

    const results = [];

    const searchValue = query
        .trim()
        .toLowerCase();

    // Empty search returns all contacts
    if (searchValue === "") {
        return [...contactArray];
    }

    // Traverse every contact
    for (let i = 0; i < contactArray.length; i++) {

        const contact = contactArray[i];

        const name = contact.name.toLowerCase();
        const phone = contact.phone;

        // Compare name and phone number
        if (
            name.includes(searchValue) ||
            phone.includes(searchValue)
        ) {
            results.push(contact);
        }
    }

    return results;
}
