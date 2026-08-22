document.addEventListener("DOMContentLoaded", () => {
    // فراخوانی دیتای قیمت پسوندهای ۶ تایی دامنه
    fetch("./assets/json/domain_prices.json")
      .then(response => {
        if (!response.ok) throw new Error("خطا در بارگذاری دیتای پسوندهای دامنه");
        return response.json();
      })
      .then(domainData => {
        renderDomainCards(domainData);
      })
      .catch(error => console.error("Error fetching Domain data:", error));
});
  
function renderDomainCards(plans) {
    const container = document.getElementById("domain-cards");
    if (!container) return;
    container.innerHTML = "";
  
    plans.forEach(plan => {
      const card = document.createElement("div");
      card.classList.add("domain-card");
  
      // تزریق کدها همگام با تصویر ۶ باکسه کوچک شما
      card.innerHTML = `
        <h3>${plan.title}</h3>
        <div class="domain-price-box">
            <span class="amount">${plan.price}</span>
            <span class="period">${plan.period}</span>
        </div>
      `;
      container.appendChild(card);
    });
}
