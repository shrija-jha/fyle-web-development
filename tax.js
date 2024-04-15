document.addEventListener("DOMContentLoaded", function () {
  const taxForm = document.getElementById('taxForm');
  const modal = document.getElementById('modal');
  const taxResult = document.getElementById('taxResult');
  const button2 = document.getElementById('button2');

  // Function to display error icon next to input fields
  function showErrorIcon(inputField) {
    const errorIcon = inputField.nextElementSibling;
    errorIcon.style.display = 'inline-block';
  }
  document.querySelectorAll('.info-icon').forEach(function (icon) {
    icon.addEventListener('click', function () {
      // This function toggles the tooltip visibility on click
      // For this example, we'll just log the tooltip content to the console
      console.log(icon.getAttribute('data-tooltip'));
    });
  });

  // Function to hide error icon next to input fields
  function hideErrorIcon(inputField) {
    const errorIcon = inputField.nextElementSibling;
    errorIcon.style.display = 'none';
  }

  // Function to validate input fields
  function validateForm() {
    let isValid = true;
    const inputs = taxForm.querySelectorAll('input, select');
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        showErrorIcon(input);
        isValid = false;
      } else {
        hideErrorIcon(input);
      }
    });
    return isValid;
  }

  // Function to calculate tax
  function calculateTax(grossIncome, extraIncome, deductions, ageGroup) {
    const overallIncome = parseFloat(grossIncome) + parseFloat(extraIncome) - parseFloat(deductions);
    let tax = 0;
    if (overallIncome > 800000) {
      switch (ageGroup) {
        case '<40':
          tax = 0.3 * (overallIncome - 800000);
          break;
        case '>=40&<60':
          tax = 0.4 * (overallIncome - 800000);
          break;
        case '>=60':
          tax = 0.1 * (overallIncome - 800000);
          break;
      }
    }
    return tax;
  }

  // Function to display modal with tax calculation result
  function showModal(taxAmount) {
    taxResult.textContent = `after tax deductions: ₹ ${taxAmount.toFixed(2)}`;
    modal.style.display = 'block';
  }

  // Event listener for form submission
  taxForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm()) {
      const grossIncome = taxForm.elements['grossIncome'].value;
      const extraIncome = taxForm.elements['extraIncome'].value;
      const deductions = taxForm.elements['deductions'].value;
      const ageGroup = taxForm.elements['age'].value;
      const taxAmount = calculateTax(grossIncome, extraIncome, deductions, ageGroup);
      showModal(taxAmount);
    }
  });

  // Event listener for closing modal
  button2.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Event listener for clicking outside modal
  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Event listener for window resize
  window.addEventListener('resize', function () {
    if (modal.style.display === 'block') {
      modal.style.margin = 'auto';
    }
  });
});