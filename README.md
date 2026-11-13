# ContactHub – Contact Search and Organizer

**A Data Structures and Algorithms Mini Project**

## 1. Project Overview

ContactHub is a browser-based Contact Search and Organizer application developed using HTML5, CSS3 and JavaScript ES6.

The application provides a simple interface to add, view, search, edit, delete and organize contact information. It demonstrates the practical implementation of fundamental Data Structures and Algorithms, including Arrays, Linear Search and Merge Sort.

Contact information is stored using browser LocalStorage, so saved records remain available after refreshing the page.

## 2. Project Objectives

- Develop a browser-based contact management system.
- Implement searching using the Linear Search algorithm.
- Implement alphabetical sorting using Merge Sort.
- Understand and apply arrays and objects in JavaScript.
- Validate user input and handle duplicate contact records.
- Store and retrieve contact information using LocalStorage.

## 3. Features

- **Add Contact:** Save a contact with name, phone number, email and category.
- **View Contacts:** Display all saved contacts in an organized directory.
- **Search Contacts:** Search by contact name or phone number.
- **Sort Contacts:** Arrange contacts alphabetically in A–Z or Z–A order.
- **Edit Contact:** Update existing contact information.
- **Delete Contact:** Remove unwanted contact records.
- **Category Management:** Organize contacts into Work, Friends and Family.
- **Input Validation:** Validate required fields, phone numbers and email addresses.
- **Duplicate Prevention:** Prevent duplicate phone numbers.
- **LocalStorage:** Preserve contact information after refreshing the browser.
- **Dashboard:** Display total contacts and category-wise statistics.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the application |
| CSS3 | Styling and responsive user interface |
| JavaScript ES6 | Application logic and DSA implementation |
| LocalStorage | Browser-based data persistence |

## 5. Data Structures and Algorithms

### A. Array of Objects

An array of JavaScript objects is used to store contact records. Each object contains contact information such as ID, name, phone number, email and category.

### B. Linear Search

The application implements a custom Linear Search algorithm to find contacts by name or phone number.

**Working:**
1. Accept the search query.
2. Traverse the contact array.
3. Compare the query with each contact's name and phone number.
4. Collect matching records.
5. Display the search results.

**Time Complexity:** O(n)

### C. Merge Sort

A custom recursive Merge Sort algorithm is implemented to arrange contacts alphabetically.

**Working:**
1. Divide the array into two halves.
2. Recursively sort both halves.
3. Merge the sorted halves.
4. Return the sorted contact array.

The application supports both ascending (A–Z) and descending (Z–A) sorting.

**Time Complexity:** O(n log n)  
**Auxiliary Space Complexity:** O(n)

## 6. Project Folder Structure

```text
Contact-Search-Organizer/
│
├── index.html
├── tests.html
├── advanced-tests.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── contacts.js
│   ├── search.js
│   ├── sort.js
│   ├── storage.js
│   ├── app.js
│   ├── tests.js
│   └── advanced-tests.js
│
└── README.md
```

## 7. How to Run the Project

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in a web browser.
4. Alternatively, use the VS Code Live Server extension.
5. Start adding, searching, editing and organizing contacts.

**No backend server or database installation is required.**

## 8. Testing

The project includes separate testing pages:

- `tests.html` – Runs automated tests for searching, sorting, validation and contact operations.
- `advanced-tests.html` – Performs performance checks using generated contact datasets and tests LocalStorage operations.

The reported functional test suite contains 14 automated tests, all of which passed.

## 9. Future Enhancements

- Import and export contact records.
- Additional contact categories.
- Contact backup and restore functionality.
- Improved accessibility and user experience.
- Optional cloud synchronization.

## 10. Academic Project Details

| Field | Details |
|---|---|
| Project Title | Contact Search and Organizer |
| Application Name | ContactHub |
| Student Name | Ankit Kumar Yadav |
| Roll Number | 2504230100021 |
| Course | B.Tech – Computer Science and Engineering |
| Semester | 3rd Semester |
| Subject | Data Structures and Algorithms |
| Faculty Guide | Ms. Anisha Singh |
| Institution | School of Management Sciences, Lucknow |
| Academic Session | 2026–2027 |

## 11. Conclusion

ContactHub demonstrates the practical application of fundamental Data Structures and Algorithms in a real-world contact management scenario. By implementing Arrays, Linear Search and Merge Sort with JavaScript, the project provides an opportunity to understand algorithmic logic while developing a functional browser-based application.

---

**Developed using HTML5, CSS3 and JavaScript ES6.**