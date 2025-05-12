import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, onChildAdded, query, orderByChild, startAt, endAt } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAV9WG5PO2IrfwNU8hqCf3xceHB8SeKeoo",
    authDomain: "raspberry-pi-55618.firebaseapp.com",
    databaseURL: "https://raspberry-pi-55618-default-rtdb.firebaseio.com",
    projectId: "raspberry-pi-55618",
    storageBucket: "raspberry-pi-55618.appspot.com",
    messagingSenderId: "24416532061",
    appId: "1:24416532061:web:9967ea084a2eebcb2b3fb4",
    measurementId: "G-7RPF60MNNT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Reference to your Firebase database
const db = getDatabase();

// Function to fetch and display data in the table
function displayData(queryRef) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear existing table rows

    // Listen for new data and update the table
    onChildAdded(queryRef, snapshot => {
        const data = snapshot.val();
        if (data) {
            const row = `
                <tr>
                    <td>${data.value}</td>
                    <td>${data.timestamp}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        }
    });
}

// Function to fetch data based on user input
function fetchData() {
    const dateInput = document.getElementById('date-input').value;
    const timeInput = document.getElementById('time-input').value;

    if (!dateInput || !timeInput) {
        console.error('Date or time input is missing.');
        return;
    }

    // Format the start and end times
    const startTime = ${dateInput} ${timeInput};
    const endTime = ${dateInput} ${timeInput};

    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);

    const ldrRef = ref(db, 'ldr_values');
    const ldrQuery = query(ldrRef, orderByChild('timestamp'), startAt(startTime), endAt(endTime));

    // Log the query
    console.log('Query:', ldrQuery);

    displayData(ldrQuery);
}

// Event listener for the search button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', fetchData);
});