import axios from "axios";
import { ComplexFilter } from "../types/filter";
import { api } from "./api";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export const userService = {
  async getUsers(page: number = 1, limit: number = 10, filter?: ComplexFilter | null, search?: string): Promise<PaginatedResponse<User>> {
    const params: any = { page, limit };

    if (filter) {
      params.filter = JSON.stringify(filter);
    }

    if (search) {
      params.search = search;
    }

    const response = await api.get("/users", { params });
    return response.data;
  },

  async getSearchSuggestions(query: string): Promise<string[]> {
    if (query.length < 2) return [];

    const response = await api.get(`/users/search/suggestions?q=${query}`);
    return response.data;
  },
};
