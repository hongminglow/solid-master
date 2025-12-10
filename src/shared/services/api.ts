/**
 * API service layer — centralizes all data fetching logic.
 * Using JSONPlaceholder for demo purposes.
 */

import { Post, Todo, User } from "@/shared/types/services";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Simulated delay for demo purposes
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
	async getUsers(): Promise<User[]> {
		await delay(300);
		const res = await fetch(`${BASE_URL}/users`);
		if (!res.ok) throw new Error("Failed to fetch users");
		return res.json();
	},

	async getUser(id: number): Promise<User> {
		await delay(200);
		const res = await fetch(`${BASE_URL}/users/${id}`);
		if (!res.ok) throw new Error("Failed to fetch user");
		return res.json();
	},

	async getTodos(limit = 10): Promise<Todo[]> {
		await delay(400);
		const res = await fetch(`${BASE_URL}/todos?_limit=${limit}`);
		if (!res.ok) throw new Error("Failed to fetch todos");
		return res.json();
	},

	async getPosts(limit = 5): Promise<Post[]> {
		await delay(350);
		const res = await fetch(`${BASE_URL}/posts?_limit=${limit}`);
		if (!res.ok) throw new Error("Failed to fetch posts");
		return res.json();
	},

	async getComments(postId: number): Promise<Comment[]> {
		await delay(250);
		const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
		if (!res.ok) throw new Error("Failed to fetch comments");
		return res.json();
	},

	// Simulated mutation (JSONPlaceholder doesn't persist but returns the created object)
	async createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
		await delay(300);
		const res = await fetch(`${BASE_URL}/todos`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todo),
		});
		if (!res.ok) throw new Error("Failed to create todo");
		return res.json();
	},

	async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
		await delay(200);
		const res = await fetch(`${BASE_URL}/todos/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updates),
		});
		if (!res.ok) throw new Error("Failed to update todo");
		return res.json();
	},
};
