document.addEventListener("DOMContentLoaded", () => {
    // فراخوانی دیتای پویای ۸ کارت خدمات فرعی شما
    fetch("./assets/json/services_prices.json")
      .then(response => {
        if (!response.ok) throw new Error("خطا در بارگذاری دیتای سایر خدمات");
        return response.json();
      })
      .then(servicesData => {
        renderServicesGrid(servicesData);
      })
      .catch(error => console.error("Error fetching services grid data:", error));
});
  
function renderServicesGrid(plans) {
    const container = document.getElementById("services-grid-cards");
    if (!container) return;
    container.innerHTML = "";
  
    plans.forEach(plan => {
      const card = document.createElement("div");
      card.classList.add("service-item-card");
  
      // تشخیص کلمه توافقی برای عبارت "از"
      const prefixText = plan.price.includes("توافقی") ? "" : "از ";
  
      // تگ img جایگزین تگ i قدیمی شد تا عکس‌های SVG را لود کند
      card.innerHTML = `
        <div>
            <img src="./assets/images/services/${plan.id}.svg" alt="${plan.title}" class="service-item-icon">
            <h3>${plan.title}</h3>
            <p>${plan.desc}</p>
        </div>
        <div>
            <div class="service-price-info">${prefixText}<strong>${plan.price}</strong></div>
            <button class="btn-view-service">مشاهده</button>
        </div>
      `;
      container.appendChild(card);
    });
}

