export interface FilterCondition {
  field: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "like" | "in" | "between" | "isNull" | "isNotNull";
  value: any;
}

export interface FilterGroup {
  conditions: FilterCondition[];
  logicalOperator: "AND" | "OR";
  groups?: FilterGroup[];
}

export interface ComplexFilter {
  conditions: FilterCondition[];
  logicalOperator: "AND" | "OR";
  groups?: FilterGroup[];
}

export interface FilterField {
  label: string;
  value: string;
  type: "text" | "number" | "date" | "select" | "boolean";
  options?: { label: string; value: any }[];
}

export interface FilterState {
  filter: ComplexFilter | null;
  search: string;
  applied: boolean;
}

// Helper functions for filter operations
export const createEmptyFilter = (): ComplexFilter => ({
  conditions: [],
  logicalOperator: "AND",
  groups: [],
});

export const addFilterCondition = (filter: ComplexFilter, condition: FilterCondition): ComplexFilter => ({
  ...filter,
  conditions: [...filter.conditions, condition],
});

export const removeFilterCondition = (filter: ComplexFilter, index: number): ComplexFilter => ({
  ...filter,
  conditions: filter.conditions.filter((_, i) => i !== index),
});

export const updateFilterCondition = (filter: ComplexFilter, index: number, updates: Partial<FilterCondition>): ComplexFilter => ({
  ...filter,
  conditions: filter.conditions.map((condition, i) => (i === index ? { ...condition, ...updates } : condition)),
});

// Convert filter to query string
export const filterToQueryString = (filter: ComplexFilter | null): string => {
  if (!filter) return "";
  return JSON.stringify(filter);
};

// Parse query string to filter
export const queryStringToFilter = (queryString: string): ComplexFilter | null => {
  try {
    const parsed = JSON.parse(queryString);
    // Ensure the parsed object has the correct type
    return {
      conditions: parsed.conditions || [],
      logicalOperator: parsed.logicalOperator === "OR" ? "OR" : "AND",
      groups: parsed.groups || [],
    };
  } catch {
    return null;
  }
};
