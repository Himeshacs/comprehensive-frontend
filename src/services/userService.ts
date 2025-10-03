import { api } from "./api";
import { ComplexFilter } from "../types/filter";

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

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const userService = {
  async getUsers(page: number = 1, limit: number = 10, search?: string, filter?: ComplexFilter | null): Promise<PaginatedResponse<User>> {
    const params: any = { page, limit };

    if (search) params.search = search;
    if (filter) params.filter = JSON.stringify(filter);

    const response = await api.get("/users", { params });
    return response.data;
  },

  async getSearchSuggestions(query: string): Promise<string[]> {
    const response = await api.get(`/users/search/suggestions?q=${query}`);
    return response.data;
  },

  async createUser(userData: Partial<User>): Promise<User> {
    const response = await api.post("/users", userData);
    return response.data;
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
