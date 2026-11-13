
/* =========================================
   CONTACTHUB - LOCAL STORAGE
   ========================================= */

const STORAGE_KEY = "contactHubContacts";


// Save contacts to LocalStorage
function saveContacts() {

    try {

        const data = JSON.stringify(contacts);

        localStorage.setItem(STORAGE_KEY, data);

        return true;

    } catch (error) {

        console.error("Unable to save contacts:", error);

        return false;
    }
}


// Load contacts from LocalStorage
function loadContacts() {

    try {

        const storedData = localStorage.getItem(STORAGE_KEY);

        if (!storedData) {
            contacts = [];
            return;
        }

        const parsedData = JSON.parse(storedData);

        if (!Array.isArray(parsedData)) {
            contacts = [];
            return;
        }

        // Basic structure validation
        contacts = parsedData.filter(contact => {

            return (
                contact &&
                typeof contact.id === "string" &&
                typeof contact.name === "string" &&
                typeof contact.phone === "string" &&
                typeof contact.email === "string" &&
                ["Work", "Friends", "Family"].includes(
                    contact.category
                )
            );

        });

    } catch (error) {

        console.error("Unable to load contacts:", error);

        contacts = [];
    }
}
