document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");
  const summary = document.getElementById("profileSummary");

  // Add Edit & Clear buttons dynamically
  const editBtn = document.createElement("button");
  const clearBtn = document.createElement("button");

  editBtn.textContent = "Edit Profile";
  editBtn.style.marginRight = "1rem";
  clearBtn.textContent = "Clear Profile";

  editBtn.type = "button";
  clearBtn.type = "button";

  summary.after(editBtn, clearBtn); // Place buttons after summary

  // Show buttons
  function showActionButtons() {
    editBtn.classList.remove("hidden");
    clearBtn.classList.remove("hidden");
  }

  // Load from localStorage
  const savedData = JSON.parse(localStorage.getItem("userProfile"));
  if (savedData) {
    fillForm(savedData);
    displaySummary(savedData);
    form.style.display = "none";
    summary.style.display = "block";
    showActionButtons();
  }

  // Save on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getFormData();

    if (!data.name || !data.age || !data.gender || !data.goal) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!confirm("Do you want to save and hide the form?")) {
      return;
    }

    const userProfile = {
      name: data.name,
      age: parseInt(data.age),
      gender: data.gender,
      goal: data.goal,
      preferences: data.preferences,
      conditions: data.conditions,
    };

    localStorage.setItem("userProfile", JSON.stringify(userProfile));


    form.reset();
    form.style.display = "none";
    displaySummary(userProfile);
    summary.style.display = "block";
    showActionButtons();

    // ⏱️ Return form after 2 seconds
    setTimeout(() => {
      summary.style.display = "none";
      fillForm(userProfile); // refill form with saved data
      form.style.display = "block";
      form.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  });

  // Edit button
  editBtn.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("userProfile"));
    if (data) fillForm(data);
    form.style.display = "block";
    summary.style.display = "none";
    form.scrollIntoView({ behavior: "smooth" });
  });

  // Clear button
  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your profile?")) {
      localStorage.removeItem("userProfile");
      form.reset();
      form.style.display = "block";
      summary.innerHTML = "";
      summary.style.display = "none";
    }
  });

  // Utilities
  function getFormData() {
    return {
      name: form.name.value.trim(),
      age: form.age.value,
      gender: form.gender.value,
      conditions: form.conditions.value.trim(),
      goal: form.goal.value,
      preferences: form.preferences.value.trim(),
    };
  }

  function fillForm(data) {
    form.name.value = data.name || "";
    form.age.value = data.age || "";
    form.gender.value = data.gender || "";
    form.conditions.value = data.conditions || "";
    form.goal.value = data.goal || "";
    form.preferences.value = data.preferences || "";
  }

  function displaySummary(data) {
    summary.innerHTML = `
      <div class="profile-card" style="border: 1px solid #ccc; padding: 1rem; border-radius: 8px;">
        <h3>Profile Summary</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Age:</strong> ${data.age}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Health Conditions:</strong> ${data.conditions || "None"}</p>
        <p><strong>Fitness Goal:</strong> ${data.goal}</p>
        <p><strong>Dietary Preferences:</strong> ${
          data.preferences || "None"
        }</p>
        <em>Returning to form in 2 seconds...</em>
      </div>
    `;
  }

  // Initially hide buttons
  editBtn.classList.add("hidden");
  clearBtn.classList.add("hidden");
});
