// Get form elements and output containers
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");
const resumeForm = document.getElementById("resume-form");
const darkModeToggle = document.createElement("button");

// Add Dark Mode Toggle
darkModeToggle.innerText = "Toggle Dark Mode";
darkModeToggle.id = "dark-mode-toggle";
darkModeToggle.style.marginBottom = "10px";
resumeForm.parentElement.insertBefore(darkModeToggle, resumeForm);

// Create template selection
const templateSelect = document.createElement("select");
templateSelect.id = "template-select";
const templates = ["template1", "template2", "template3", "template4", "template5"];
templates.forEach(template => {
  const option = document.createElement("option");
  option.value = template;
  option.innerText = template.charAt(0).toUpperCase() + template.slice(1);
  templateSelect.appendChild(option);
});
resumeForm.parentElement.insertBefore(templateSelect, resumeForm);

// Real-time preview and validation
generateBtn.addEventListener("click", () => {
  const inputs = ["name", "email", "phone", "education", "experience", "skills", "hobbies"];
  let isValid = true;

  // Validate inputs
  inputs.forEach((id) => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      field.style.borderColor = "red"; // Highlight empty fields
      isValid = false;
    } else {
      field.style.borderColor = "#985858"; // Reset border color if valid
    }
  });

  if (!isValid) {
    alert("Please fill in all fields.");
    return; // Stop execution if validation fails
  }

  // Update preview
  document.getElementById("output-name").innerText = document.getElementById("name").value;
  document.getElementById("output-email").innerText = document.getElementById("email").value;
  document.getElementById("output-phone").innerText = document.getElementById("phone").value;
  document.getElementById("output-education").innerText = document.getElementById("education").value;
  document.getElementById("output-experience").innerText = document.getElementById("experience").value;
  document.getElementById("output-skills").innerText = document.getElementById("skills").value;
  document.getElementById("output-hobbies").innerText = document.getElementById("hobbies").value;

  // Apply selected template
  const selectedTemplate = templateSelect.value;
  const resumeOutput = document.querySelector(".resume-preview");
  resumeOutput.className = `resume-preview ${selectedTemplate}`; // Apply the selected template class

  // Save data to localStorage
  localStorage.setItem("resumeData", JSON.stringify({
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    education: document.getElementById("education").value,
    experience: document.getElementById("experience").value,
    skills: document.getElementById("skills").value,
    hobbies: document.getElementById("hobbies").value
  }));
});

// Download resume as PDF with styles using html2canvas and jsPDF
downloadBtn.addEventListener("click", () => {
  const resumePreview = document.querySelector(".resume-preview");
  const downloadButton = document.getElementById("download-btn");

  // Temporarily hide the "Download PDF" button
  downloadButton.style.display = "none";

  html2canvas(resumePreview, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    // Calculate dimensions to fit content within A4 size
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Resume.pdf");

    // Show the "Download PDF" button again
    downloadButton.style.display = "block";
  });
});

// Load saved data from localStorage
window.addEventListener("load", () => {
  const savedData = JSON.parse(localStorage.getItem("resumeData"));
  if (savedData) {
    for (let key in savedData) {
      const field = document.getElementById(key);
      if (field) field.value = savedData[key]; // Populate fields with saved data
    }
  }
});

// Add Dark Mode functionality
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode"); // Toggle dark mode class
});