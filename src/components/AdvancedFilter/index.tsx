import React, { useState } from "react";
import { ComplexFilter, FilterCondition, FilterField } from "../../types/filter";

interface AdvancedFilterProps {
  fields: FilterField[];
  onFilterChange: (filter: ComplexFilter | null) => void;
  initialFilter?: ComplexFilter | null;
}

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ fields, onFilterChange, initialFilter }) => {
  const [filter, setFilter] = useState<ComplexFilter>(initialFilter || { conditions: [], logicalOperator: "AND" });
  const [isExpanded, setIsExpanded] = useState(false);

  const addCondition = () => {
    const newCondition: FilterCondition = {
      field: fields[0]?.value || "",
      operator: "eq",
      value: "",
    };

    const updatedFilter = {
      ...filter,
      conditions: [...filter.conditions, newCondition],
    };

    setFilter(updatedFilter);
  };

  const updateCondition = (index: number, updates: Partial<FilterCondition>) => {
    const updatedConditions = filter.conditions.map((condition, i) => (i === index ? { ...condition, ...updates } : condition));

    const updatedFilter = { ...filter, conditions: updatedConditions };
    setFilter(updatedFilter);
  };

  const removeCondition = (index: number) => {
    const updatedConditions = filter.conditions.filter((_, i) => i !== index);
    const updatedFilter = { ...filter, conditions: updatedConditions };
    setFilter(updatedFilter);

    // If no conditions left, clear the filter
    if (updatedConditions.length === 0) {
      onFilterChange(null);
    }
  };

  const applyFilter = () => {
    if (filter.conditions.length === 0) {
      onFilterChange(null);
    } else {
      onFilterChange(filter);
    }
  };

  const clearFilter = () => {
    const emptyFilter = { conditions: [], logicalOperator: "AND" };
    setFilter(emptyFilter);
    onFilterChange(null);
  };

  const getOperatorOptions = (fieldType: string) => {
    const baseOperators = [
      { value: "eq", label: "Equals" },
      { value: "neq", label: "Not Equals" },
    ];

    switch (fieldType) {
      case "text":
        return [...baseOperators, { value: "like", label: "Contains" }, { value: "isNull", label: "Is Empty" }, { value: "isNotNull", label: "Is Not Empty" }];
      case "number":
        return [
          ...baseOperators,
          { value: "gt", label: "Greater Than" },
          { value: "gte", label: "Greater Than or Equal" },
          { value: "lt", label: "Less Than" },
          { value: "lte", label: "Less Than or Equal" },
          { value: "between", label: "Between" },
        ];
      case "date":
        return [
          ...baseOperators,
          { value: "gt", label: "After" },
          { value: "gte", label: "On or After" },
          { value: "lt", label: "Before" },
          { value: "lte", label: "On or Before" },
          { value: "between", label: "Between" },
        ];
      case "select":
      case "boolean":
        return [...baseOperators, { value: "in", label: "In" }];
      default:
        return baseOperators;
    }
  };

  const renderValueInput = (condition: FilterCondition, index: number) => {
    const field = fields.find((f) => f.value === condition.field);
    if (!field) return null;

    if (condition.operator === "isNull" || condition.operator === "isNotNull") {
      return null; // No value input for null checks
    }

    if (condition.operator === "between") {
      return (
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <input
            type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
            value={Array.isArray(condition.value) ? condition.value[0] || "" : ""}
            onChange={(e) => {
              const currentValue = Array.isArray(condition.value) ? condition.value : ["", ""];
              updateCondition(index, {
                value: [e.target.value, currentValue[1]],
              });
            }}
            style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "3px", flex: 1 }}
            placeholder="From"
          />
          <span>and</span>
          <input
            type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
            value={Array.isArray(condition.value) ? condition.value[1] || "" : ""}
            onChange={(e) => {
              const currentValue = Array.isArray(condition.value) ? condition.value : ["", ""];
              updateCondition(index, {
                value: [currentValue[0], e.target.value],
              });
            }}
            style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "3px", flex: 1 }}
            placeholder="To"
          />
        </div>
      );
    }

    if (field.type === "select" && field.options) {
      return (
        <select
          value={condition.value || ""}
          onChange={(e) => updateCondition(index, { value: e.target.value })}
          style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "3px", minWidth: "120px" }}
        >
          <option value="">Select value</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "boolean") {
      return (
        <select
          value={condition.value || ""}
          onChange={(e) => updateCondition(index, { value: e.target.value === "true" })}
          style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "3px", minWidth: "120px" }}
        >
          <option value="">Select</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      );
    }

    return (
      <input
        type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
        value={condition.value || ""}
        onChange={(e) => updateCondition(index, { value: e.target.value })}
        style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "3px", minWidth: "120px" }}
        placeholder="Enter value"
      />
    );
  };

  return (
    <div className="filter-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h3 style={{ margin: 0 }}>Advanced Filters</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            padding: "5px 10px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          {isExpanded ? "Collapse" : "Expand"} Filters
        </button>
      </div>

      {isExpanded && (
        <div>
          <div style={{ marginBottom: "15px" }}>
            {filter.conditions.map((condition, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                  padding: "10px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                }}
              >
                <select
                  value={condition.field}
                  onChange={(e) => updateCondition(index, { field: e.target.value })}
                  style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "3px", minWidth: "150px" }}
                >
                  <option value="">Select field</option>
                  {fields.map((field) => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </select>

                {condition.field && (
                  <select
                    value={condition.operator}
                    onChange={(e) => updateCondition(index, { operator: e.target.value as any })}
                    style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "3px", minWidth: "150px" }}
                  >
                    {getOperatorOptions(fields.find((f) => f.value === condition.field)?.type || "text").map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                )}

                {renderValueInput(condition, index)}

                <button
                  onClick={() => removeCondition(index)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={addCondition}
              style={{
                padding: "8px 15px",
                backgroundColor: "#2ecc71",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Condition
            </button>

            <button
              onClick={applyFilter}
              disabled={filter.conditions.length === 0}
              style={{
                padding: "8px 15px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: filter.conditions.length === 0 ? "not-allowed" : "pointer",
                opacity: filter.conditions.length === 0 ? 0.6 : 1,
              }}
            >
              Apply Filter
            </button>

            <button
              onClick={clearFilter}
              style={{
                padding: "8px 15px",
                backgroundColor: "#95a5a6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Clear All
            </button>

            {filter.conditions.length > 0 && <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>{filter.conditions.length} condition(s) applied</span>}
          </div>
        </div>
      )}
    </div>
  );
};
