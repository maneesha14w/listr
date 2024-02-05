import { create } from "zustand"

export type Book = {
	key: string
	title: string
	author_name: string[]
	first_publish_year: string
	number_of_pages_median: string | null
	status: "complete" | "reading" | "toRead"
}

interface BookState {
	books: Book[]
}

interface BookStore extends BookState {
	addBook: (newBook: Book) => void
}
