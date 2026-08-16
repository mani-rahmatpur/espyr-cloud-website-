document.addEventListener("DOMContentLoaded", () => {
    // فراخوانی مستقیم فایل دیتای تخصصی سرور اختصاصی
    fetch("./assets/json/dedicated_prices.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("خطا در بارگذاری دیتای سرور اختصاصی");
        }
        return response.json();
      })
      .then(dedicatedData => {
        renderDedicatedCards(dedicatedData);
      })
      .catch(error => console.error("Error fetching Dedicated Server data:", error));
});
  
function renderDedicatedCards(plans) {
    const container = document.getElementById("dedicated-cards");
    if (!container) return;
    container.innerHTML = "";
    
    plans.forEach(plan => {
        const card = document.createElement("div");
        card.classList.add("dedicated-card");
        
        let badgeHTML = "";
        if (plan.badge) {
            card.classList.add("featured");
            badgeHTML = `<div class="dedicated-badge">${plan.badge}</div>`;
        }
        
        const featuresHTML = plan.features
            .map(feat => `<li>${feat}</li>`)
            .join("");
            
        // ساختار کاملاً یکپارچه و تفکیک‌شده برای رندر بدون تکرار متون و بدون آیکون
        card.innerHTML = `
            ${badgeHTML}
            <div class="dedicated-card-header">
                <h3>${plan.title}</h3>
            </div>
            
            <div class="dedicated-card-body">
                <div class="dedicated-price-box">
                    <span class="amount">${plan.price}</span>
                    <span class="period">${plan.period}</span>
                </div>
                <ul class="dedicated-features-list">
                    ${featuresHTML}
                </ul>
            </div>
            
            <button class="btn-dedicated-buy">سفارش</button>
        `;
        container.appendChild(card);
    });
}
