
// JavaScript file for the "JSON Data" task:

// Console log to check if the JavaScript file is linked successfully:
console.log("JavaScript file is successfully linked!");

// Fetch and read the JSON file:
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Display all data, sorted by age, and filtered by city:
        displayData(data);

        // Adding interaction for filtering by city:
        document.getElementById('filter-btn').addEventListener('click', () => {
            const city = document.getElementById('city-input').value;
            document.getElementById('data').innerHTML = `
                <h2>Filtered by City: ${city}</h2>
                ${formatData(filterByCity(data, city))}
            `;
        });
    })
    .catch(error => console.error('Error fetching the JSON file:', error));

// Function to display all data:
function displayData(data) {
    document.getElementById('data').innerHTML = `
        <h2>All Records</h2>
        ${formatData(data)}
        <h2>Sorted by Age</h2>
        ${formatData(sortByAge(data))}
    `;
}

// Function to format data as HTML:
function formatData(data) {
    return data.map(record => {
        return `
            <div class="record">
                <h3>${record.name}</h3>
                <p>Age: ${record.age}</p>
                <p>City: ${record.city}</p>
                <p>Email: ${record.email}</p>
                <p>Phone: ${record.phone}</p>
                <p>Address: ${record.address.street}, ${record.address.zipcode}</p>
                <p>Hobbies: ${record.hobbies.join(', ')}</p>
            </div>
        `;
    }).join('');
}

// Function to sort records by age:
function sortByAge(data) {
    return data.slice().sort((a, b) => a.age - b.age);
}

// Function to filter records by city:
function filterByCity(data, city) {
    return data.filter(record => record.city === city);
}
