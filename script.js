document.getElementById("dob").max = new Date().toISOString().split("T")[0];

function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  const result = document.getElementById("result");
  const dob = new Date(dobInput);
  if (!dobInput || isNaN(dob)) {
    result.innerHTML = "<p style='color: red;'>Please select a valid date of birth.</p>";
    return;
  }

  const today = new Date();

  // Gregorian Age
  let gYears = today.getFullYear() - dob.getFullYear();
  let gMonths = today.getMonth() - dob.getMonth();
  let gDays = today.getDate() - dob.getDate();

  if (gDays < 0) {
    gMonths -= 1;
    gDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (gMonths < 0) {
    gYears -= 1;
    gMonths += 12;
  }

  // Hijri Age
  const totalGregorianDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
  const hijriTotalDays = totalGregorianDays * (354.367 / 365.2425);
  const hTotal = Math.floor(hijriTotalDays);

  const hYears = Math.floor(hTotal / 354);
  const hRem = hTotal % 354;
  const hMonths = Math.floor(hRem / 29);
  const hDays = hRem % 29;

  // Display both
  result.innerHTML = `
    <div class="age-card">
      <h3>Gregorian Age</h3>
      <div class="big-year">${gYears} Years</div>
      <div class="sub-details">${gMonths} months, ${gDays} days</div>
    </div>
    <div class="age-card">
      <h3>Hijri Age</h3>
      <div class="big-year">${hYears} Years</div>
      <div class="sub-details">${hMonths} months, ${hDays} days</div>
    </div>
  `;
}
