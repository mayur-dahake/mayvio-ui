const MOCK_DATA = [
  { id: 101, name: "Alice Johnson", role: "Software Engineer", email: "alice.j@example.com", status: "Active", joinDate: "2024-03-15" },
  { id: 102, name: "Bob Smith", role: "Product Manager", email: "bob.s@example.com", status: "Active", joinDate: "2023-11-10" },
  { id: 103, name: "Charlie Brown", role: "UX Designer", email: "charlie.b@example.com", status: "Inactive", joinDate: "2024-01-20" },
  { id: 104, name: "Diana Prince", role: "QA Engineer", email: "diana.p@example.com", status: "Active", joinDate: "2023-08-05" },
  { id: 105, name: "Evan Wright", role: "DevOps Specialist", email: "evan.w@example.com", status: "Active", joinDate: "2024-02-18" },
  { id: 106, name: "Fiona Gallagher", role: "Frontend Dev", email: "fiona.g@example.com", status: "Inactive", joinDate: "2023-05-12" },
  { id: 107, name: "George Costanza", role: "System Admin", email: "george.c@example.com", status: "Active", joinDate: "2022-09-01" },
  { id: 108, name: "Hannah Abbott", role: "Security Analyst", email: "hannah.a@example.com", status: "Active", joinDate: "2024-04-02" },
  { id: 109, name: "Ian Malcolm", role: "Data Scientist", email: "ian.m@example.com", status: "Active", joinDate: "2023-06-25" },
  { id: 110, name: "Julia Roberts", role: "HR Generalist", email: "julia.r@example.com", status: "Inactive", joinDate: "2023-12-15" },
  { id: 111, name: "Kevin Bacon", role: "Backend Developer", email: "kevin.b@example.com", status: "Active", joinDate: "2024-01-10" },
  { id: 112, name: "Laura Croft", role: "Database Engineer", email: "laura.c@example.com", status: "Active", joinDate: "2023-04-30" },
  { id: 113, name: "Marcus Aurelius", role: "Scrum Master", email: "marcus.a@example.com", status: "Active", joinDate: "2022-12-05" },
  { id: 114, name: "Nina Simone", role: "Tech Writer", email: "nina.s@example.com", status: "Inactive", joinDate: "2023-10-14" },
  { id: 115, name: "Oscar Wilde", role: "Creative Director", email: "oscar.w@example.com", status: "Active", joinDate: "2023-07-22" }
];

export function initDataGrid() {
  const container = document.querySelector(".data-grid-container");
  if (!container) return;

  const searchInput = document.getElementById("dgSearch");
  const colBtn = document.getElementById("dgColBtn");
  const colDropdown = document.getElementById("dgColDropdown");
  const colMenu = colDropdown?.querySelector(".dg-dropdown-menu");
  const table = document.getElementById("dgTable");
  const thead = table?.querySelector("thead tr");
  const tbody = table?.querySelector("tbody");
  
  const pageSizeSelect = document.getElementById("dgPageSize");
  const pagInfo = document.getElementById("dgPaginationInfo");
  const pageNumbers = document.getElementById("dgPageNumbers");
  
  const btnFirst = document.getElementById("dgFirstPage");
  const btnPrev = document.getElementById("dgPrevPage");
  const btnNext = document.getElementById("dgNextPage");
  const btnLast = document.getElementById("dgLastPage");

  if (!table || !tbody || !thead) return;

  // Grid State
  let searchQuery = "";
  let currentPage = 1;
  let pageSize = pageSizeSelect ? parseInt(pageSizeSelect.value, 10) : 10;
  let sortCol = null;
  let sortDir = "asc"; // 'asc' or 'desc'

  let columns = [
    { key: "id", label: "ID", visible: true, type: "number", sortable: true },
    { key: "name", label: "Name", visible: true, type: "string", sortable: true },
    { key: "role", label: "Role", visible: true, type: "string", sortable: true },
    { key: "email", label: "Email", visible: true, type: "string", sortable: true },
    { key: "status", label: "Status", visible: true, type: "string", sortable: true },
    { key: "joinDate", label: "Join Date", visible: true, type: "date", sortable: true }
  ];

  let filteredData = [...MOCK_DATA];

  // 1. Initialize Column Toggles Menu
  function initColumnDropdown() {
    if (!colMenu || !colBtn) return;

    // Toggle dropdown open/close
    colBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = colDropdown.classList.contains("open");
      colDropdown.classList.toggle("open", !isOpen);
      colBtn.setAttribute("aria-expanded", String(!isOpen));
    });

    // Close on outer clicks
    document.addEventListener("click", (e) => {
      if (!colDropdown.contains(e.target)) {
        colDropdown.classList.remove("open");
        colBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Generate checkboxes
    colMenu.innerHTML = columns
      .map(
        (col) => `
        <label class="dg-dropdown-item">
          <input type="checkbox" data-key="${col.key}" ${col.visible ? "checked" : ""}>
          <span>${col.label}</span>
        </label>`
      )
      .join("");

    // Handle visibility changes
    colMenu.querySelectorAll("input").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const key = e.target.dataset.key;
        const col = columns.find((c) => c.key === key);
        if (col) {
          col.visible = e.target.checked;
          renderGrid();
        }
      });
    });
  }

  // 2. Perform Filtering & Sorting
  function updateDataSubset() {
    // A. Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      filteredData = MOCK_DATA.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
    } else {
      filteredData = [...MOCK_DATA];
    }

    // B. Sort rows
    if (sortCol) {
      const col = columns.find((c) => c.key === sortCol);
      const isAsc = sortDir === "asc";
      const factor = isAsc ? 1 : -1;

      filteredData.sort((a, b) => {
        let valA = a[sortCol];
        let valB = b[sortCol];

        if (col.type === "number") {
          return (valA - valB) * factor;
        } else if (col.type === "date") {
          return (new Date(valA) - new Date(valB)) * factor;
        } else {
          return String(valA).localeCompare(String(valB)) * factor;
        }
      });
    }
  }

  // 3. Render Header Row
  function renderHeader() {
    const visibleCols = columns.filter((c) => c.visible);
    
    thead.innerHTML = visibleCols
      .map((col) => {
        const isSorted = sortCol === col.key;
        let sortAttr = 'aria-sort="none"';
        let icon = "⇅";
        
        if (isSorted) {
          sortAttr = `aria-sort="${sortDir === "asc" ? "ascending" : "descending"}"`;
          icon = sortDir === "asc" ? "▲" : "▼";
        }

        return `
          <th 
            scope="col" 
            class="${col.sortable ? "sortable" : ""}" 
            data-key="${col.key}"
            ${col.sortable ? sortAttr : ""}
            tabindex="${col.sortable ? "0" : "-1"}"
          >
            ${col.label}
            ${col.sortable ? `<span class="data-grid-sort-icon" aria-hidden="true">${icon}</span>` : ""}
          </th>`;
      })
      .join("");

    // Bind Sorting Event Listeners
    thead.querySelectorAll("th.sortable").forEach((th) => {
      const handleSort = () => {
        const key = th.dataset.key;
        if (sortCol === key) {
          sortDir = sortDir === "asc" ? "desc" : "asc";
        } else {
          sortCol = key;
          sortDir = "asc";
        }
        currentPage = 1;
        renderGrid();
      };

      th.addEventListener("click", handleSort);
      th.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort();
        }
      });
    });
  }

  // 4. Render Table Body Rows
  function renderBody() {
    const visibleCols = columns.filter((c) => c.visible);

    if (filteredData.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="${visibleCols.length}" style="text-align: center; color: var(--text-muted); padding: 32px 16px;">
            No records match the active filters.
          </td>
        </tr>`;
      return;
    }

    // Paginate matching rows
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredData.length);
    const paginatedRows = filteredData.slice(startIndex, endIndex);

    tbody.innerHTML = paginatedRows
      .map((row) => {
        const cells = visibleCols
          .map((col) => {
            const val = row[col.key];
            if (col.key === "status") {
              const statusClass = String(val).toLowerCase();
              return `<td><span class="dg-badge ${statusClass}">${val}</span></td>`;
            }
            return `<td>${val}</td>`;
          })
          .join("");
        
        return `<tr role="row">${cells}</tr>`;
      })
      .join("");
  }

  // 5. Render Pagination Info and Nav Control Status
  function renderPagination() {
    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;

    // Boundary check
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const startIdx = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endIdx = Math.min(currentPage * pageSize, totalRecords);

    // Update textual info
    if (pagInfo) {
      pagInfo.textContent = `Showing ${startIdx}-${endIdx} of ${totalRecords}`;
    }

    // Enable/Disable pagination buttons
    if (btnFirst) btnFirst.disabled = currentPage === 1;
    if (btnPrev) btnPrev.disabled = currentPage === 1;
    if (btnNext) btnNext.disabled = currentPage === totalPages;
    if (btnLast) btnLast.disabled = currentPage === totalPages;

    // Render page numbers
    if (pageNumbers) {
      pageNumbers.innerHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `dg-page-num ${i === currentPage ? "active" : ""}`;
        btn.textContent = String(i);
        btn.setAttribute("aria-label", `Page ${i}`);
        btn.setAttribute("aria-current", i === currentPage ? "page" : "false");
        btn.addEventListener("click", () => {
          currentPage = i;
          renderGridOnlyBodyAndPaging();
        });
        pageNumbers.appendChild(btn);
      }
    }
  }

  // Optimize renders
  function renderGridOnlyBodyAndPaging() {
    renderBody();
    renderPagination();
  }

  function renderGrid() {
    updateDataSubset();
    renderHeader();
    renderBody();
    renderPagination();
  }

  // 6. Bind Event Listeners
  
  // Search filtering
  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    currentPage = 1;
    renderGrid();
  });

  // Page size selection
  pageSizeSelect?.addEventListener("change", (e) => {
    pageSize = parseInt(e.target.value, 10);
    currentPage = 1;
    renderGrid();
  });

  // Pagination navigation buttons
  btnFirst?.addEventListener("click", () => {
    currentPage = 1;
    renderGridOnlyBodyAndPaging();
  });
  
  btnPrev?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderGridOnlyBodyAndPaging();
    }
  });

  btnNext?.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
    if (currentPage < totalPages) {
      currentPage++;
      renderGridOnlyBodyAndPaging();
    }
  });

  btnLast?.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
    currentPage = totalPages;
    renderGridOnlyBodyAndPaging();
  });

  // Kickstart components
  initColumnDropdown();
  renderGrid();
}
