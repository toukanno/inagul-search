// 状態管理
let currentPos = "all";
let currentElement = "all";
let currentSeries = "all";
let currentSort = "id";
let sortAsc = true;
let searchQuery = "";

const posColors = { GK:"#f59e0b", DF:"#3b82f6", MF:"#10b981", FW:"#ef4444" };
const elementIcons = { 火:"🔥", 土:"🌎", 木:"🌿", 風:"💨", 闇:"🌑" };
const seriesLabel = { "1":"イナイレ1", "GO":"GO", "CS":"クロノ・ストーン", "Galaxy":"ギャラクシー" };
const seriesOrder = { "1":1, "GO":2, "CS":3, "Galaxy":4 };
const elementOrder = { "火":1, "土":2, "木":3, "風":4, "闇":5 };

function getFiltered() {
  let result = characters.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      c.name.includes(q) ||
      c.kana.includes(q) ||
      c.team.toLowerCase().includes(q) ||
      c.hissatsu.some(h => h.toLowerCase().includes(q));
    const matchPos = currentPos === "all" || c.pos === currentPos;
    const matchElement = currentElement === "all" || c.element === currentElement;
    const matchSeries = currentSeries === "all" || c.series === currentSeries;
    return matchSearch && matchPos && matchElement && matchSeries;
  });

  result.sort((a, b) => {
    let cmp = 0;
    if (currentSort === "id") cmp = a.id - b.id;
    else if (currentSort === "name") cmp = a.kana.localeCompare(b.kana, "ja");
    else if (currentSort === "team") cmp = a.team.localeCompare(b.team, "ja");
    else if (currentSort === "element") cmp = (elementOrder[a.element] || 99) - (elementOrder[b.element] || 99);
    else if (currentSort === "number") cmp = a.number - b.number;
    else if (currentSort === "series") cmp = (seriesOrder[a.series] || 99) - (seriesOrder[b.series] || 99);
    return sortAsc ? cmp : -cmp;
  });

  return result;
}

function renderCards() {
  const grid = document.getElementById("card-grid");
  const noResult = document.getElementById("no-result");
  const countEl = document.getElementById("result-count");
  const data = getFiltered();

  countEl.textContent = `${data.length} / ${characters.length} 件`;

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

function updateActiveFilters() {
  const container = document.getElementById("active-filters");
  const tags = document.getElementById("active-tags");
  const hasFilter = currentPos !== "all" || currentElement !== "all" || currentSeries !== "all" || searchQuery !== "";

  container.style.display = hasFilter ? "flex" : "none";
  if (!hasFilter) return;

  let html = "";
  if (searchQuery) html += `<span class="active-tag">🔍 "${searchQuery}"</span>`;
  if (currentPos !== "all") html += `<span class="active-tag">ポジション: ${currentPos}</span>`;
  if (currentElement !== "all") html += `<span class="active-tag">${elementIcons[currentElement]} ${currentElement}</span>`;
  if (currentSeries !== "all") html += `<span class="active-tag">📺 ${seriesLabel[currentSeries]}</span>`;
  tags.innerHTML = html;
}

function resetAll() {
  searchQuery = "";
  currentPos = "all";
  currentElement = "all";
  currentSeries = "all";
  currentSort = "id";
  sortAsc = true;

  document.getElementById("search").value = "";
  document.getElementById("search-clear").style.display = "none";

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b.dataset.pos === "all"));
  document.querySelectorAll(".element-btn").forEach(b => b.classList.toggle("active", b.dataset.el === "all"));
  document.querySelectorAll(".series-btn").forEach(b => b.classList.toggle("active", b.dataset.series === "all"));
  document.querySelectorAll(".sort-btn").forEach(b => b.classList.toggle("active", b.dataset.sort === "id"));
  updateSortDirBtn();
  updateActiveFilters();
  renderCards();
}

function updateSortDirBtn() {
  const btn = document.getElementById("sort-dir");
  btn.textContent = sortAsc ? "↑ 昇順" : "↓ 降順";
}

// イベント: 検索
const searchInput = document.getElementById("search");
const searchClear = document.getElementById("search-clear");

searchInput.addEventListener("input", e => {
  searchQuery = e.target.value;
  searchClear.style.display = searchQuery ? "block" : "none";
  updateActiveFilters();
  renderCards();
});

searchClear.addEventListener("click", () => {
  searchQuery = "";
  searchInput.value = "";
  searchClear.style.display = "none";
  updateActiveFilters();
  renderCards();
});

// イベント: ポジションフィルター
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentPos = btn.dataset.pos;
    updateActiveFilters();
    renderCards();
  });
});

// イベント: 属性フィルター
document.querySelectorAll(".element-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".element-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentElement = btn.dataset.el;
    updateActiveFilters();
    renderCards();
  });
});

// イベント: シリーズフィルター
document.querySelectorAll(".series-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".series-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentSeries = btn.dataset.series;
    updateActiveFilters();
    renderCards();
  });
});

// イベント: ソート
document.querySelectorAll(".sort-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentSort = btn.dataset.sort;
    renderCards();
  });
});

// イベント: 昇順/降順トグル
document.getElementById("sort-dir").addEventListener("click", () => {
  sortAsc = !sortAsc;
  updateSortDirBtn();
  renderCards();
});

// イベント: リセット
document.getElementById("reset-all").addEventListener("click", resetAll);

// 初期描画
renderCards();
