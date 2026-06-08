// @ts-nocheck
import React, { useState, useMemo, useRef, useEffect } from "react";

/**
 * React Wrapper for Mayvio UI Data Grid component.
 * Features search filtering, column sorting, pagination controls, and column visibility toggles.
 * 
 * Props:
 * - initialData (Array<Object>): Data array to represent.
 * - columns (Array<{key: string, label: string, type: 'number'|'string'|'date', sortable: boolean}>): Column definitions.
 */
export function DataGridWrapper({ initialData = [], columns = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [visibleCols, setVisibleCols] = useState(columns.map((col) => col.key));
  const [isColMenuOpen, setIsColMenuOpen] = useState(false);
  const colMenuRef = useRef(null);

  // Click outside handler for column dropdown toggle
  useEffect(() => {
    const handleOuterClick = (e) => {
      if (colMenuRef.current && !colMenuRef.current.contains(e.target)) {
        setIsColMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOuterClick);
    return () => document.removeEventListener("click", handleOuterClick);
  }, []);

  // Filter & Sort Data
  const processedData = useMemo(() => {
    let result = [...initialData];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) => String(val).toLowerCase().includes(q))
      );
    }

    // 2. Sorting
    if (sortConfig.key) {
      const colDef = columns.find((c) => c.key === sortConfig.key);
      const isAsc = sortConfig.direction === "asc";
      const factor = isAsc ? 1 : -1;

      result.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (colDef?.type === "number") {
          return (valA - valB) * factor;
        } else if (colDef?.type === "date") {
          return (new Date(valA) - new Date(valB)) * factor;
        } else {
          return String(valA).localeCompare(String(valB)) * factor;
        }
      });
    }

    return result;
  }, [initialData, searchQuery, sortConfig, columns]);

  // Pagination bounds
  const totalRecords = processedData.length;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;
  const pageIndex = Math.min(currentPage, totalPages);
  
  const startRecord = totalRecords === 0 ? 0 : (pageIndex - 1) * pageSize + 1;
  const endRecord = Math.min(pageIndex * pageSize, totalRecords);

  const paginatedData = useMemo(() => {
    const start = (pageIndex - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, pageIndex, pageSize]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
    setCurrentPage(1);
  };

  const handleColToggle = (key) => {
    setVisibleCols((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="data-grid-container">
      {/* Search and Column visibility toolbar */}
      <div className="data-grid-toolbar">
        <div className="data-grid-search">
          <input
            type="text"
            placeholder="Search rows..."
            aria-label="Search rows"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="data-grid-actions">
          <div ref={colMenuRef} className={`dg-dropdown ${isColMenuOpen ? "open" : ""}`}>
            <button
              type="button"
              className="control-btn dg-dropdown-trigger"
              aria-haspopup="listbox"
              aria-expanded={isColMenuOpen}
              onClick={() => setIsColMenuOpen(!isColMenuOpen)}
            >
              <span className="dg-dropdown-label">Columns</span>
              <span className="dg-dropdown-arrow">▼</span>
            </button>
            {isColMenuOpen && (
              <div className="dg-dropdown-menu" role="listbox" aria-label="Toggle Columns">
                {columns.map((col) => (
                  <label key={col.key} className="dg-dropdown-item">
                    <input
                      type="checkbox"
                      checked={visibleCols.includes(col.key)}
                      onChange={() => handleColToggle(col.key)}
                    />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table viewport */}
      <div className="data-grid-wrapper" role="region" aria-label="Data Grid" tabIndex={0}>
        <table className="data-grid" role="grid">
          <thead>
            <tr role="row">
              {columns
                .filter((col) => visibleCols.includes(col.key))
                .map((col) => {
                  const isSorted = sortConfig.key === col.key;
                  const sortAttr = isSorted
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none";
                  const sortIcon = isSorted
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : "⇅";

                  return (
                    <th
                      key={col.key}
                      scope="col"
                      className={col.sortable ? "sortable" : ""}
                      aria-sort={col.sortable ? sortAttr : undefined}
                      tabIndex={col.sortable ? 0 : -1}
                      onClick={() => col.sortable && handleSort(col.key)}
                      onKeyDown={(e) => {
                        if (col.sortable && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          handleSort(col.key);
                        }
                      }}
                    >
                      {col.label}
                      {col.sortable && (
                        <span className="data-grid-sort-icon" aria-hidden="true">
                          {sortIcon}
                        </span>
                      )}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} role="row">
                  {columns
                    .filter((col) => visibleCols.includes(col.key))
                    .map((col) => {
                      const val = row[col.key];
                      if (col.key === "status") {
                        const statusClass = String(val).toLowerCase();
                        return (
                          <td key={col.key}>
                            <span className={`dg-badge ${statusClass}`}>{val}</span>
                          </td>
                        );
                      }
                      return <td key={col.key}>{val}</td>;
                    })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={visibleCols.length}
                  style={{
                    textAlign: "center",
                    color: "var(--text-muted)",
                    padding: "32px 16px"
                  }}
                >
                  No records match the active filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination control footer */}
      <div className="data-grid-pagination">
        <div className="dg-page-size">
          <label htmlFor="dgPageSizeReact">Rows per page:</label>
          <select
            id="dgPageSizeReact"
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <div className="dg-pagination-info" aria-live="polite">
          Showing {startRecord}-{endRecord} of {totalRecords}
        </div>
        <div className="dg-pagination-controls">
          <button
            type="button"
            className="control-btn dg-pag-btn"
            disabled={pageIndex === 1}
            onClick={() => setCurrentPage(1)}
            aria-label="First page"
          >
            «
          </button>
          <button
            type="button"
            className="control-btn dg-pag-btn"
            disabled={pageIndex === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            aria-label="Previous page"
          >
            ‹
          </button>
          <div className="dg-page-numbers">
            {pageNumbers.map((num) => (
              <button
                key={num}
                type="button"
                className={`dg-page-num ${num === pageIndex ? "active" : ""}`}
                aria-label={`Page ${num}`}
                aria-current={num === pageIndex ? "page" : undefined}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="control-btn dg-pag-btn"
            disabled={pageIndex === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            aria-label="Next page"
          >
            ›
          </button>
          <button
            type="button"
            className="control-btn dg-pag-btn"
            disabled={pageIndex === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            aria-label="Last page"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
