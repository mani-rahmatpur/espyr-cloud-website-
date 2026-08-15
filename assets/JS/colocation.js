document.addEventListener("DOMContentLoaded", () => {
    // فراخوانی مستقیم فایل دیتای کولوکیشن از پوشه جدید شما
    fetch("./assets/json/colocation_prices.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("خطا در بارگذاری دیتای کولوکیشن دیتاسنتر");
        }
        return response.json();
      })
      .then(colocationData => {
        renderColocationCards(colocationData);
      })
      .catch(error => console.error("Error fetching Colocation data:", error));
});
  
function renderColocationCards(plans) {
    const container = document.getElementById("colocation-cards");
    if (!container) return;
    container.innerHTML = "";
    
    plans.forEach(plan => {
        const card = document.createElement("div");
        card.classList.add("colocation-card");
        
        let badgeHTML = "";
        if (plan.badge) {
            card.classList.add("featured");
            badgeHTML = `<div class="colocation-badge">${plan.badge}</div>`;
        }
        
        const featuresHTML = plan.features
            .map(feat => `<li>${feat}</li>`)
            .join("");
            
        /* تگ img آیکون کاملاً حذف شد تا کارت‌ها بدون آیکون رندر شوند */
        card.innerHTML = `
            ${badgeHTML}
            <div class="colocation-card-header">
                <h3>${plan.title}</h3>
            </div>
            
            <div class="colocation-card-body">
                <div class="colocation-price-box">
                    <span class="amount">${plan.price}</span>
                    <span class="period">${plan.period}</span>
                </div>
                <ul class="colocation-features-list">
                    ${featuresHTML}
                </ul>
            </div>
            
            <button class="btn-colocation-buy">سفارش</button>
        `;
        container.appendChild(card);
    });
}


