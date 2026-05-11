(function () {
  const records = Array.isArray(window.RESEARCH_RECORDS) ? window.RESEARCH_RECORDS : [];
  const list = document.getElementById("record-list");
  const empty = document.getElementById("empty-state");
  const search = document.getElementById("record-search");
  const clear = document.getElementById("clear-search");
  const filters = Array.from(document.querySelectorAll(".filter"));
  const resultCount = document.getElementById("result-count");
  const timeline = document.getElementById("timeline");

  let activeFilter = "all";
  let query = "";

  function normalise(value) {
    return String(value || "").trim().toLowerCase();
  }

  function formatDate(value) {
    if (!value) return "Undated";
    const date = new Date(value + "T00:00:00");
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(date);
  }

  function recordMatches(record) {
    const kindMatch = activeFilter === "all" || normalise(record.kind) === activeFilter;
    const haystack = [
      record.title,
      record.kind,
      record.status,
      record.field,
      record.abstract,
      ...(record.tags || [])
    ].map(normalise).join(" ");

    return kindMatch && (!query || haystack.includes(query));
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderRecords() {
    const filtered = records
      .filter(recordMatches)
      .sort((a, b) => normalise(b.date).localeCompare(normalise(a.date)));

    resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "record" : "records"}`;
    list.innerHTML = "";

    if (!filtered.length) {
      empty.style.display = "grid";
      return;
    }

    empty.style.display = "none";

    filtered.forEach((record) => {
      const article = document.createElement("article");
      article.className = "record-card";
      const tags = (record.tags || [])
        .map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`)
        .join("");

      const title = escapeHTML(record.title || "Untitled record");
      const titleHTML = record.url
        ? `<a href="${escapeHTML(record.url)}">${title}</a>`
        : title;

      article.innerHTML = `
        <div>
          <span class="record-kind">${escapeHTML(record.kind || "record")}</span>
        </div>
        <div class="record-main">
          <h3>${titleHTML}</h3>
          <p>${escapeHTML(record.abstract || "No abstract supplied yet.")}</p>
          <div class="record-tags">
            ${record.field ? `<span class="tag">${escapeHTML(record.field)}</span>` : ""}
            ${tags}
          </div>
        </div>
        <div>
          <span class="record-date">${escapeHTML(formatDate(record.date))}</span><br />
          <span class="record-status">${escapeHTML(record.status || "open")}</span>
        </div>
      `;

      list.appendChild(article);
    });
  }

  function renderTimeline() {
    const updates = records
      .filter((record) => ["news", "paper", "theorem", "discovery", "invention", "writing"].includes(normalise(record.kind)))
      .sort((a, b) => normalise(b.date).localeCompare(normalise(a.date)))
      .slice(0, 4);

    if (!updates.length) return;

    timeline.innerHTML = updates.map((record) => `
      <article class="timeline-item">
        <span class="timeline-date">${escapeHTML(formatDate(record.date))}</span>
        <div>
          <h3>${escapeHTML(record.title || "Untitled update")}</h3>
          <p>${escapeHTML(record.abstract || "No summary supplied yet.")}</p>
        </div>
      </article>
    `).join("");
  }

  search.addEventListener("input", (event) => {
    query = normalise(event.target.value);
    renderRecords();
  });

  clear.addEventListener("click", () => {
    search.value = "";
    query = "";
    activeFilter = "all";
    filters.forEach((button) => button.classList.toggle("active", button.dataset.filter === "all"));
    renderRecords();
    search.focus();
  });

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filters.forEach((item) => item.classList.toggle("active", item === button));
      renderRecords();
    });
  });

  document.addEventListener("keydown", (event) => {
    const wantsSearch = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
    if (!wantsSearch) return;
    event.preventDefault();
    search.focus();
  });

  renderRecords();
  renderTimeline();
})();
