
/* =========================================
   CONTACTHUB - MAIN APPLICATION
   ========================================= */


// DOM ELEMENTS

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const categoryInput = document.getElementById("category");

const contactIdInput = document.getElementById("contactId");

const searchInput = document.getElementById("searchInput");

const contactList = document.getElementById("contactList");

const totalContacts = document.getElementById("totalContacts");
const workContacts = document.getElementById("workContacts");
const familyContacts = document.getElementById("familyContacts");
const friendContacts = document.getElementById("friendContacts");

const resultCount = document.getElementById("resultCount");

const formHeading = document.getElementById("formHeading");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const message = document.getElementById("message");

const showAllBtn = document.getElementById("showAllBtn");
const sortOrder = document.getElementById("sortOrder");


// DISPLAY MESSAGE

function showMessage(text, type) {

    message.textContent = text;

    message.className = "message " + type;
}


// RESET FORM

function resetForm() {

    contactForm.reset();

    contactIdInput.value = "";

    formHeading.textContent = "Add New Contact";

    submitBtn.textContent = "+ Add Contact";

    cancelEditBtn.hidden = true;
}


// UPDATE DASHBOARD

function updateDashboard() {

    totalContacts.textContent = contacts.length;

    workContacts.textContent = contacts.filter(
        contact => contact.category === "Work"
    ).length;

    familyContacts.textContent = contacts.filter(
        contact => contact.category === "Family"
    ).length;

    friendContacts.textContent = contacts.filter(
        contact => contact.category === "Friends"
    ).length;
}


// CREATE CONTACT CARD

function createContactCard(contact) {

    const card = document.createElement("article");

    card.className = "contact-card";

    // Contact top section
    const top = document.createElement("div");

    top.className = "contact-top";

    const avatar = document.createElement("div");

    avatar.className = "contact-avatar";

    avatar.textContent = contact.name
        .trim()
        .charAt(0)
        .toUpperCase();

    const identity = document.createElement("div");

    const contactName = document.createElement("h3");

    contactName.className = "contact-name";

    contactName.textContent = contact.name;

    const category = document.createElement("span");

    category.className =
        "contact-category category-" +
        contact.category.toLowerCase();

    category.textContent = contact.category;

    identity.append(contactName, category);

    top.append(avatar, identity);


    // Contact details
    const details = document.createElement("div");

    details.className = "contact-details";

    const phone = document.createElement("p");

    phone.textContent = "☎ " + contact.phone;

    const email = document.createElement("p");

    email.textContent = "✉ " +
        (contact.email || "No email provided");

    details.append(phone, email);


    // Action buttons
    const actions = document.createElement("div");

    actions.className = "contact-actions";

    const editButton = document.createElement("button");

    editButton.type = "button";
    editButton.className = "btn-edit";
    editButton.textContent = "Edit";
    editButton.dataset.action = "edit";
    editButton.dataset.id = contact.id;

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = contact.id;

    actions.append(editButton, deleteButton);

    card.append(top, details, actions);

    return card;
}


// DISPLAY CONTACTS

function renderContacts(list) {

    // Remove previous contact cards
    contactList.replaceChildren();

    resultCount.textContent =
        list.length + (list.length === 1
            ? " contact found"
            : " contacts found");


    if (list.length === 0) {

        const empty = document.createElement("div");

        empty.className = "empty-state";

        const icon = document.createElement("div");
        icon.className = "empty-icon";
        icon.textContent = "👤";

        const heading = document.createElement("h3");
        heading.textContent = contacts.length === 0
            ? "No contacts yet"
            : "No matching contacts";

        const description = document.createElement("p");
        description.textContent = contacts.length === 0
            ? "Add your first contact to get started."
            : "Try another name or phone number.";

        empty.append(icon, heading, description);

        contactList.appendChild(empty);

        return;
    }


    // Create contact cards
    const fragment = document.createDocumentFragment();

    list.forEach(contact => {

        fragment.appendChild(
            createContactCard(contact)
        );

    });

    contactList.appendChild(fragment);
}


// SEARCH AND SORT CONTACTS

function refreshContacts() {

    // Step 1: Search using Linear Search
    const matchingContacts = linearSearch(
        contacts,
        searchInput.value
    );

    // Step 2: Sort using Merge Sort
    const sortedContacts = mergeSort(
        matchingContacts,
        sortOrder.value
    );

    // Step 3: Display results
    renderContacts(sortedContacts);

    // Step 4: Update dashboard
    updateDashboard();
}


// ADD OR UPDATE CONTACT

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value.trim();

    const phone = phoneInput.value.trim();

    const email = emailInput.value.trim();

    const category = categoryInput.value;

    const id = contactIdInput.value;


    let result;

    if (id) {

        result = updateContact(
            id,
            name,
            phone,
            email,
            category
        );

    } else {

        result = addContact(
            name,
            phone,
            email,
            category
        );

    }


    if (!result.success) {

        showMessage(result.message, "error");

        return;
    }


    // Save updated contacts
    if (!saveContacts()) {

        showMessage(
            "Contact changed, but browser storage could not be updated.",
            "error"
        );

        refreshContacts();

        return;
    }


    resetForm();

    // Clear old search after adding/updating
    searchInput.value = "";

    refreshContacts();

    showMessage(result.message, "success");

});


// SEARCH WHILE TYPING

searchInput.addEventListener("input", function() {

    refreshContacts();

});


// SHOW ALL CONTACTS

showAllBtn.addEventListener("click", function() {

    searchInput.value = "";

    sortOrder.value = "asc";

    refreshContacts();

});


// SORT CONTACTS

sortOrder.addEventListener("change", function() {

    refreshContacts();

});


// EDIT AND DELETE USING EVENT DELEGATION

contactList.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button || !contactList.contains(button)) {
        return;
    }

    const id = button.dataset.id;

    const action = button.dataset.action;


    // EDIT CONTACT
    if (action === "edit") {

        const contact = contacts.find(
            item => item.id === id
        );

        if (!contact) {
            showMessage("Contact not found.", "error");
            return;
        }

        contactIdInput.value = contact.id;

        nameInput.value = contact.name;

        phoneInput.value = contact.phone;

        emailInput.value = contact.email;

        categoryInput.value = contact.category;

        formHeading.textContent = "Edit Contact";

        submitBtn.textContent = "Save Changes";

        cancelEditBtn.hidden = false;

        showMessage("Editing " + contact.name, "success");

        nameInput.focus();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // DELETE CONTACT
    if (action === "delete") {

        const contact = contacts.find(
            item => item.id === id
        );

        if (!contact) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete " +
            contact.name + "?"
        );

        if (!confirmed) {
            return;
        }

        const deleted = deleteContact(id);

        if (deleted) {

            if (!saveContacts()) {
                showMessage(
                    "Deleted in memory, but storage could not be updated.",
                    "error"
                );
                return;
            }

            if (contactIdInput.value === id) {
                resetForm();
            }

            refreshContacts();

            showMessage(
                "Contact deleted successfully!",
                "success"
            );

        }

    }

});


// CANCEL EDIT

cancelEditBtn.addEventListener("click", function() {

    resetForm();

    showMessage("Edit cancelled.", "success");

});


// INITIALIZE APPLICATION

function initializeApp() {

    // Load saved contacts
    loadContacts();

    // Display initial contacts
    refreshContacts();

    console.log("ContactHub initialized successfully.");

}


// Start application
initializeApp();
