// 状態管理
let currentPos = "all";
let currentSort = "id";
let searchQuery = "";

const posColors = { GK:"#f59e0b", DF:"#3b82f6", MF:"#10b981", FW:"#ef4444" };
const elementIcons = { 火:"🔥", 土:"🌎", 木:"🌿", 風:"💨", 闇:"🌑" };
const seriesLabel = { "1":"イナイレ1", "GO":"GO", "CS":"クロノ・ストーン", "Galaxy":"ギャラクシー" };

function getFiltered() {
  return characters
    .filter(c => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        c.name.includes(q) ||
        c.kana.includes(q) ||
        c.team.includes(q) ||
        c.hissatsu.some(h => h.includes(q));
      const matchPos = currentPos === "all" || c.pos === currentPos;
      return matchSearch && matchPos;
    })
    .sort((a, b) => {
      if (currentSort === "id") return a.id - b.id;
      if (currentSort === "name") return a.kana.localeCompare(b.kana);
      if (currentSort === "team") return a.team.localeCompare(b.team, "ja");
      return 0;
    });
}

function renderCards() {
  const grid = document.getElementById("card-grid");
  const noResult = document.getElementById("no-result");
  const countEl = document.getElementById("result-count");
  const data = getFiltered();

  countEl.textContent = `${data.length} 件`;

  if (data.length === 0) {
    grid.innerHTML = "";
    noResult.style.display = "block";
    return;
  }
  noResult.style.display = "none";

  grid.innerHTML = data.map(c => `
    <div class="card" data-pos="${c.pos}">
      <div class="card-header">
        <span class="pos-badge" style="background:${posColors[c.pos]}">${c.pos}</span>
        <span class="series-badge">${seriesLabel[c.series] || c.series}</span>
      </div>
      <div class="card-name">
        <span class="number">#${c.number}</span>
        <span class="name">${c.name}</span>
      </div>
      <div class="card-kana">${c.kana}</div>
      <div class="card-team">📍 ${c.team}</div>
      <div class="card-element">${elementIcons[c.element] || ""} ${c.element}属性</div>
      <div class="card-hissatsu">
        <span class="hissatsu-label">必殺技</span>
        ${c.hissatsu.map(h => `<span class="hissatsu-tag">${h}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

// イベント
document.getElementById("search").addEventListener("input", e => {
  searchQuery = e.target.value;
  renderCards();
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentPos = btn.dataset.pos;
    renderCards();
  });
});

document.querySelectorAll(".sort-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentSort = btn.dataset.sort;
    renderCards();
  });
});

// 初期描画
renderCards();
