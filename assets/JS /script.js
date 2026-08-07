/* =========================================================================
=           جاوا اسکریپت صفحه اصلی با پشتیبانی ۱۰۰٪ از آیکون‌های SVG          =
========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // فراخوانی دیتای پویای ۵ کارت اصلی سایت شما
  fetch("./assets/json/data.json")
    .then(response => {
      if (!response.ok) throw new Error("خطا در لود فایل دیتای قیمت‌های اصلی");
      return response.json();
    })
    .then(data => {
      renderCards(data.plans);
    })
    .catch(error => console.error("Error fetching main website data:", error));
});

function renderCards(plans) {
  const container = document.getElementById("pricing-cards");
  if (!container) return;
  container.innerHTML = "";

  plans.forEach(plan => {
    const card = document.createElement("div");
    card.classList.add("card");

    // بررسی و ساخت تگ بج اختصاصی (مثل پرفروش‌ترین)
    let badgeHTML = "";
    if (plan.badge) {
      card.classList.add("featured");
      badgeHTML = `<div class="badge">${plan.badge}</div>`;
    }

    // ساخت لیست ویژگی‌ها به صورت پویا
    const featuresHTML = plan.features
      .map(feature => `<li>${feature}</li>`)
      .join("");

    /* 
       تغییر اصلی اینجاست: تگ i فونت‌آوسم حذف شد و تگ img جایگزین گردید 
       تا آیکون‌های SVG را بر اساس شناسه (id) به درستی از پوشه icons بخواند
    */
    card.innerHTML = `
      ${badgeHTML}
      <div>
          <img src="./assets/images/icons/${plan.id}.svg" alt="${plan.title}" class="service-icon">
          <h3>${plan.title}</h3>

          <div class="price-box">
              <span class="from">از</span>
              <span class="amount">${plan.price}</span>
              <span class="period">${plan.period}</span>
          </div>

          <ul class="features-list">
              ${featuresHTML}
          </ul>
      </div>

      <button class="btn-card ${plan.btnClass}" id="btn-${plan.id}">
          ${plan.btnText}
      </button>
    `;

    container.appendChild(card);

    // مدیریت و منطق کلیک دکمه‌های ۵ کارت اصلی سایت و هدایت کاربر
    const cardButton = card.querySelector(`.btn-card`);
    
    if (plan.id === "vps") {
      cardButton.addEventListener("click", () => {
        window.location.href = "vps.html";
      });
    } else if (plan.id === "dedicated") {
      cardButton.addEventListener("click", () => {
        window.location.href = "dedicated.html";
      });
    } else if (plan.id === "co-location") {
      cardButton.addEventListener("click", () => {
        window.location.href = "colocation.html";
      });
    } else if (plan.id === "domain") {
      cardButton.addEventListener("click", () => {
        window.location.href = "domain.html";
      });
    } else if (plan.id === "shared") {
      cardButton.addEventListener("click", () => {
        window.location.href = "shared-host.html";
      });
    } else {
      cardButton.addEventListener("click", () => {
        console.log(`کلیک روی پلن: ${plan.title}`);
      });
    }
  });
}
