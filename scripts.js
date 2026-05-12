document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function () {
            menu.classList.toggle('show');
            this.innerHTML = menu.classList.contains('show') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('show');
                menuToggle.innerHTML = '☰';
            }
        });
    }
});




// Open modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
function filterPlans(company) {
    const plans = document.querySelectorAll('.plan');

    plans.forEach(plan => {
        if (company === 'all' || plan.classList.contains(company)) {
            plan.classList.add('active');
        } else {
            plan.classList.remove('active');
        }
    });
}





// Plans data for each brand and category


// Function to update the brand dropdown based on selected category
function updateBrands() {
    const category = document.getElementById("vehicle-category").value;
    const brandSelect = document.getElementById("vehicle-brand");
    brandSelect.innerHTML = '<option value="">Select Brand</option>';  // Reset brands

    if (category) {
        const brands = Object.keys(plansData[category]);
        brands.forEach(brand => {
            const option = document.createElement("option");
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    }
}

// Function to display plans based on selected brand
function displayPlans() {
    const category = document.getElementById("vehicle-category").value;
    const brand = document.getElementById("vehicle-brand").value;
    const plansContainer = document.getElementById("plans");

    if (category && brand && plansData[category][brand]) {
        const plans = plansData[category][brand];
        plansContainer.innerHTML = `<h3>Available Plans for ${brand}:</h3>`;
        const list = document.createElement("ul");
        plans.forEach(plan => {
            const listItem = document.createElement("li");
            listItem.textContent = plan;
            list.appendChild(listItem);
        });
        plansContainer.appendChild(list);
    } else {
        plansContainer.innerHTML = '';  // Clear if no valid selection
    }
}



function redirectToHome() {
    alert("Thank you for your feedback! Redirecting to the home page.");
    window.location.href = "index.html"; // Redirect to home page
    return false; // Prevents the default form submission
}
function filterPlans(company) {
    // Get all buttons and remove the 'active' class from them
    const buttons = document.querySelectorAll('.button-group button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add the 'active' class to the clicked button
    const activeButton = Array.from(buttons).find(button => button.textContent.toLowerCase().includes(company));
    if (activeButton) activeButton.classList.add('active');

    // Get all plan elements
    const allPlans = document.querySelectorAll('.plan');
    
    // Loop through all the plan elements and show/hide based on company selection
    allPlans.forEach(plan => {
        // Check if the plan is associated with the selected company or if 'all' is selected
        if (company === 'all' || plan.classList.contains(company)) {
            plan.style.display = 'block';  // Show plan
        } else {
            plan.style.display = 'none';   // Hide plan
        }
    });
}

// Optionally, set a default filter when the page loads (e.g., show all plans)
window.onload = function() {
    filterPlans('all');
};
// Data for Vehicle Plans by Type and Brand
// Dummy Data for Vehicle Plans by Type and Brand
const plansData = {
    "four-wheeler": {
        "toyota": [
            { name: "Toyota Car Plan A", details: "Comprehensive insurance for Toyota cars." },
            { name: "Toyota Car Plan B", details: "Accident-only coverage for Toyota cars." },
            { name: "Toyota Car Plan C", details: "Theft and fire coverage for Toyota cars." },
        ],
        "ford": [
            { name: "Ford Car Plan A", details: "Full coverage for Ford cars." },
            { name: "Ford Car Plan B", details: "Basic coverage for Ford cars." },
            { name: "Ford Car Plan C", details: "Third-party coverage for Ford cars." },
        ]
    },
    "two-wheeler": {
        "honda": [
            { name: "Honda Bike Plan A", details: "Comprehensive insurance for Honda bikes." },
            { name: "Honda Bike Plan B", details: "Accident-only coverage for Honda bikes." },
            { name: "Honda Bike Plan C", details: "Third-party liability coverage for Honda bikes." },
        ],
        "yamaha": [
            { name: "Yamaha Bike Plan A", details: "Full coverage for Yamaha bikes." },
            { name: "Yamaha Bike Plan B", details: "Basic coverage for Yamaha bikes." },
            { name: "Yamaha Bike Plan C", details: "Third-party coverage for Yamaha bikes." },
        ]
    }
};

// Function to Update Brands Based on Vehicle Category Selection
function updateBrands() {
    const category = document.getElementById('vehicle-category').value;
    const brandDropdown = document.getElementById('vehicle-brand');
    const plansContainer = document.getElementById('plans-container');

    // Clear previous brand options and plans
    brandDropdown.innerHTML = '<option value="">Select Brand</option>';
    plansContainer.innerHTML = '';

    if (category) {
        const brands = Object.keys(plansData[category]);
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand.charAt(0).toUpperCase() + brand.slice(1);
            brandDropdown.appendChild(option);
        });
    }
}

// Function to Display Plans Based on Selected Brand
function displayPlans() {
    const category = document.getElementById('vehicle-category').value;
    const brand = document.getElementById('vehicle-brand').value;
    const plansContainer = document.getElementById('plans-container');

    // Clear previous plans
    plansContainer.innerHTML = '';

    if (category && brand) {
        const plans = plansData[category][brand];

        if (plans && plans.length > 0) {
            plans.forEach(plan => {
                const planElement = document.createElement('div');
                planElement.classList.add('plan');
                planElement.innerHTML = `
                    <h3>${plan.name}</h3>
                    <p>${plan.details}</p>
                `;
                plansContainer.appendChild(planElement);
            });
        } else {
            plansContainer.innerHTML = '<p>No plans available for this brand.</p>';
        }
    }
}

// Optional: Menu Toggle Function (if you plan to implement a menu toggle)
function showPlans(vehicleType) {
    const plansContainer = document.getElementById('plans-container');
    plansContainer.style.display = 'block';

    if (vehicleType === 'two-wheeler') {
        plansContainer.innerHTML = `
            <h2>Two Wheeler Insurance Plans</h2>
            <div class="plan">
                <strong>Company: SpeedShield Insurance</strong><br>
                Plan: Basic Coverage<br>
                Premium: $120/year<br>
                Benefits: Third-party liability, accidental cover.
            </div>
            <div class="plan">
                <strong>Company: AutoSecure</strong><br>
                Plan: Comprehensive Care<br>
                Premium: $200/year<br>
                Benefits: Third-party, theft, accidental cover.
            </div>
            <div class="plan">
                <strong>Company: RideSafe</strong><br>
                Plan: Premium Plus<br>
                Premium: $250/year<br>
                Benefits: All-inclusive coverage with roadside assistance.
            </div>
            <div class="plan">
                <strong>Company: TwoWheelerPro</strong><br>
                Plan: Theft Protection<br>
                Premium: $150/year<br>
                Benefits: Covers theft and accidental damage.
            </div>
            <div class="plan">
                <strong>Company: ShieldOn</strong><br>
                Plan: Standard Plan<br>
                Premium: $180/year<br>
                Benefits: Third-party liability with medical expenses.
            </div>
        `;
    } else if (vehicleType === 'four-wheeler') {
        plansContainer.innerHTML = `
            <h2>Four Wheeler Insurance Plans</h2>
            <div class="plan">
                <strong>Company: DriveSure</strong><br>
                Plan: Full Coverage<br>
                Premium: $500/year<br>
                Benefits: Comprehensive coverage with personal accident cover.
            </div>
            <div class="plan">
                <strong>Company: AutoGuardian</strong><br>
                Plan: Economy Plan<br>
                Premium: $300/year<br>
                Benefits: Third-party liability, basic accidental cover.
            </div>
            <div class="plan">
                <strong>Company: CarProtect</strong><br>
                Plan: Premium Coverage<br>
                Premium: $600/year<br>
                Benefits: Theft, accidental, and engine protection.
            </div>
            <div class="plan">
                <strong>Company: RoadCare</strong><br>
                Plan: Standard Plan<br>
                Premium: $400/year<br>
                Benefits: Comprehensive coverage with roadside assistance.
            </div>
            <div class="plan">
                <strong>Company: AutoSafe</strong><br>
                Plan: Basic Protection<br>
                Premium: $350/year<br>
                Benefits: Third-party liability with limited accidental coverage.
            </div>
        `;
    }
}











