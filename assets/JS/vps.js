document.addEventListener("DOMContentLoaded", () => {
    // فراخوانی مستقیم فایل از مسیر جدید پوشه تخصصی شما
    fetch("./assets/json/vps_prices.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("خطا در بارگذاری دیتای سرور مجازی");
        }
        return response.json();
      })
      .then(vpsData => {
        renderVpsCards(vpsData);
      })
      .catch(error => console.error("Error fetching VPS data:", error));
});
  
function renderVpsCards(plans) {
    const container = document.getElementById("vps-cards");
    if (!container) return;
    container.innerHTML = "";
  
    plans.forEach(plan => {
      const card = document.createElement("div");
      card.classList.add("vps-card");
  
      // بررسی وجود نشان محبوب یا پرفروش بالای کارت
      let badgeHTML = "";
      if (plan.badge) {
        card.classList.add("featured");
        badgeHTML = `<div class="vps-badge">${plan.badge}</div>`;
      }
  
      // رندر پیکسلی و منظم لیست مشخصات سخت‌افزاری سرور
      const featuresHTML = plan.features
        .map(feat => `<li>${feat}</li>`)
        .join("");
  
      // تزریق دقیق المان‌ها متناسب با فایل vps.css جدید
      card.innerHTML = `
        ${badgeHTML}
        <div>
            <h3>${plan.title}</h3>
            <div class="vps-price-box">
                <span class="amount">${plan.price}</span>
                <span class="period">${plan.period}</span>
            </div>
            <ul class="vps-features-list">
                ${featuresHTML}
            </ul>
        </div>
        <button class="btn-vps-buy">سفارش</button>
      `;
  
      container.appendChild(card);
    });
}
