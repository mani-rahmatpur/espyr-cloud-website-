document.addEventListener("DOMContentLoaded", () => {
    // فراخوانی دیتای قیمت هاست اشتراکی
    fetch("./assets/json/shared_prices.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("خطا در بارگذاری دیتای هاست اشتراکی");
        }
        return response.json();
      })
      .then(sharedData => {
        renderSharedCards(sharedData);
      })
      .catch(error => console.error("Error fetching Shared Hosting data:", error));
});
  
function renderSharedCards(plans) {
    const container = document.getElementById("shared-cards");
    if (!container) return;
    container.innerHTML = "";
  
    plans.forEach(plan => {
      const card = document.createElement("div");
      card.classList.add("shared-card");
  
      // اعمال استایل برای کارت محبوب (پلن حرفه‌ای)
      let badgeHTML = "";
      if (plan.badge) {
        card.classList.add("featured");
        badgeHTML = `<div class="shared-badge">${plan.badge}</div>`;
      }
  
      // تولید لیست ویژگی‌های هر هاست
      const featuresHTML = plan.features
        .map(feat => `<li>${feat}</li>`)
        .join("");
  
      // تزریق کدها همگام با معماری CSS صفحه با کلاس جدید
      card.innerHTML = `
        ${badgeHTML}
        <div>
            <h3>${plan.title}</h3>
            <div class="shared-price-box">
                <span class="amount">${plan.price}</span>
                <span class="period">${plan.period}</span>
            </div>
            <ul class="shared-features-list">
                ${featuresHTML}
            </ul>
        </div>
        <button class="btn-shared-buy">سفارش</button>
      `;
  
      container.appendChild(card);
    });
}
