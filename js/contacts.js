
/* =========================================
   CONTACTHUB - CONTACT MANAGEMENT
   ========================================= */

// Main Array of Objects
let contacts = [];


// Generate unique contact ID
function generateContactId() {

    return Date.now().toString() +
        Math.random().toString(36).slice(2, 7);
}


// Validate contact information
function validateContact(name, phone, email, category) {

    if (!name.trim()) {
        return "Please enter a contact name.";
    }

    if (!/^\d{10}$/.test(phone.trim())) {
        return "Phone number must contain exactly 10 digits.";
    }

    if (
        email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
        return "Please enter a valid email address.";
    }

    const validCategories = ["Work", "Friends", "Family"];

    if (!validCategories.includes(category)) {
        return "Please select a valid category.";
    }

    return null;
}


// Add new contact
function addContact(name, phone, email, category) {

    const error = validateContact(
        name, phone, email, category
    );

    if (error) {
        return {
            success: false,
            message: error
        };
    }

    // Prevent duplicate phone numbers
    const duplicate = contacts.some(
        contact => contact.phone === phone.trim()
    );

    if (duplicate) {
        return {
            success: false,
            message: "This phone number already exists."
        };
    }

    const contact = {
        id: generateContactId(),
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        category: category
    };

    contacts.push(contact);

    return {
        success: true,
        message: "Contact added successfully!"
    };
}


// Update existing contact
function updateContact(id, name, phone, email, category) {

    const error = validateContact(
        name, phone, email, category
    );

    if (error) {
        return {
            success: false,
            message: error
        };
    }

    const index = contacts.findIndex(
        contact => contact.id === id
    );

    if (index === -1) {
        return {
            success: false,
            message: "Contact not found."
        };
    }

    // Prevent duplicate phone numbers
    const duplicate = contacts.some(
        contact =>
            contact.phone === phone.trim() &&
            contact.id !== id
    );

    if (duplicate) {
        return {
            success: false,
            message: "Another contact already uses this phone number."
        };
    }

    contacts[index] = {
        ...contacts[index],
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        category: category
    };

    return {
        success: true,
        message: "Contact updated successfully!"
    };
}


// Delete contact
function deleteContact(id) {

    const index = contacts.findIndex(
        contact => contact.id === id
    );

    if (index === -1) {
        return false;
    }

    contacts.splice(index, 1);

    return true;
}


// Get all contacts
function getAllContacts() {

    return [...contacts];
}
