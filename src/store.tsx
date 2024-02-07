import { Book } from "lucide-react"
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
	removeBook: (bookToRemove: Book) => void
	moveBook: (book: Book, newStatus: Book["status"]) => void
	loadBooksFromLocalStorage: () => void
}

const useStore = create<BookStore>((set) => ({
	books: [],
	addBook: (newBook) =>
		set((state: BookState) => {
			const updatedBooks = [
				...state.books,
				{ ...newBook, status: newBook.status as "toRead" },
			]
			localStorage.setItem("readingList", JSON.stringify(updatedBooks))
			return { books: updatedBooks }
		}),
	removeBook: (bookToRemove) => {},
	moveBook: (book, newStatus) => {},
	loadBooksFromLocalStorage: () => {},
}))
