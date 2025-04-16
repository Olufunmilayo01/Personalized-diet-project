document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");
  const preview = document.getElementById("profilePreview");

  // Add Edit & Clear buttons dynamically
  const editBtn = document.createElement("button");
  const clearBtn = document.createElement("button");

  editBtn.textContent = "Edit Profile";
  editBtn.style.marginRight = "1rem";
  clearBtn.textContent = "Clear Profile";

  editBtn.type = "button";
  clearBtn.type = "button";

  preview.after(editBtn, clearBtn);

  // Function to show buttons
  function showActionButtons() {
    editBtn.style.display = "inline-block";
    clearBtn.style.display = "inline-block";
  }

  // Load from localStorage
  const savedData = JSON.parse(localStorage.getItem("userProfile"));
  if (savedData) {
    fillForm(savedData);
    updatePreview(savedData);
    showActionButtons();
  }

  // Update preview on input
  form.addEventListener("input", () => {
    updatePreview(getFormData());
  });

  // Save on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getFormData();

    // Validate fields (basic)
    if (!data.name || !data.age || !data.gender || !data.goal) {
      alert("Please fill in all required fields.");
      return;
    }

    const userProfile = {
      name: data.name,
      age: parseInt(data.age),
      gender: data.gender,
      goal: data.goal,
      preferences: data.preferences,
      conditions: data.conditions
    };

    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    updatePreview(userProfile);
    alert("Profile saved successfully!");
    showActionButtons();
  });

  // Edit button
  editBtn.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("userProfile"));
    if (data) fillForm(data);
    form.scrollIntoView({ behavior: "smooth" });
  });

  // Clear button
  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your profile?")) {
      localStorage.removeItem("userProfile");
      form.reset();
      preview.innerHTML = "";
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

  function updatePreview(data) {
    preview.innerHTML = `
      <h3>Profile Preview</h3>
      <table>
        <tr><td><strong>Full Name:</strong></td><td>${data.name || "-"}</td></tr>
        <tr><td><strong>Age:</strong></td><td>${data.age || "-"}</td></tr>
        <tr><td><strong>Gender:</strong></td><td>${data.gender || "-"}</td></tr>
        <tr><td><strong>Health Conditions:</strong></td><td>${data.conditions || "-"}</td></tr>
        <tr><td><strong>Fitness Goal:</strong></td><td>${data.goal || "-"}</td></tr>
        <tr><td><strong>Dietary Preferences:</strong></td><td>${data.preferences || "-"}</td></tr>
      </table>
    `;
  }

  editBtn.classList.add("hidden");
  clearBtn.classList.add("hidden");

  function showActionButtons() {
    editBtn.classList.remove("hidden");
    clearBtn.classList.remove("hidden");
  }
});
