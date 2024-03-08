import { create } from "zustand"

export type Book = {
	key: string
	title: string
	author_name: string[]
	first_publish_year: number
	number_of_pages_median: number | null
	status: "complete" | "reading" | "saved"
}

interface BookState {
	books: Book[]
}

const initialBooks: Book[] = [
	{
		key: "/works/OL262758W",
		title: "The Hobbit",
		author_name: ["J.R.R. Tolkien"],
		first_publish_year: 1937,
		number_of_pages_median: 312,
		status: "complete",
	},
	{
		key: "/works/OL27479W",
		title: "The Two Towers",
		author_name: ["J.R.R. Tolkien"],
		first_publish_year: 1954,
		number_of_pages_median: 440,
		status: "reading",
	},
	{
		key: "/works/OL27516W",
		title: "The Return of the King",
		author_name: ["J.R.R. Tolkien"],
		first_publish_year: 1950,
		number_of_pages_median: 482,
		status: "reading",
	},
	{
		key: "/works/OL14933414W",
		title: "The Fellowship of the Ring",
		author_name: ["J.R.R. Tolkien"],
		first_publish_year: 1954,
		number_of_pages_median: 496,
		status: "saved",
	},
	{
		key: "/works/OL8324629W",
		title: "The Ethnic Cleansing of Palestine",
		author_name: ["Ilan Pappé", "Luis Noriega"],
		first_publish_year: 2006,
		number_of_pages_median: 320,
		status: "complete",
	},
	{
		key: "/works/OL2733666W",
		title: "The Holocaust Industry",
		author_name: ["Norman G. Finkelstein"],
		first_publish_year: 2000,
		number_of_pages_median: 203,
		status: "complete",
	},
	{
		key: "/works/OL82548W",
		title: "Harry Potter and the Order of the Phoenix",
		author_name: ["J. K. Rowling"],
		first_publish_year: 2003,
		number_of_pages_median: 893,
		status: "complete",
	},
	{
		key: "/works/OL82563W",
		title: "Harry Potter and the Philosopher's Stone",
		author_name: ["J. K. Rowling"],
		first_publish_year: 1997,
		number_of_pages_median: 303,
		status: "saved",
	},
]

interface BookStore extends BookState {
	addBook: (newBook: Book) => void
	removeBook: (bookToRemove: Book) => void
	moveBook: (book: Book, newStatus: Book["status"]) => void
	loadBooksFromLocalStorage: () => void
	reorderBooks: (
		listType: Book["status"],
		startIndex: number,
		endIndex: number,
	) => void
}

export const useStore = create<BookStore>((set) => ({
	books: [],
	addBook: (newBook) =>
		set((state: BookState) => {
			const updatedBooks = [
				...state.books,
				{ ...newBook, status: newBook.status as "saved" },
			]
			localStorage.setItem("readingList", JSON.stringify(updatedBooks))
			return { books: updatedBooks }
		}),
	removeBook: (bookToRemove) => {
		set((state: BookState) => {
			if (
				window.confirm(`Are you sure you want to remove ${bookToRemove.title}?`)
			) {
				const updatedBooks: Book[] = state.books.filter(
					(book) => book.key !== bookToRemove.key,
				)
				localStorage.setItem("readingList", JSON.stringify(updatedBooks))
				return { books: updatedBooks }
			}
			return state
		})
	},
	moveBook: (bookToMove, newStatus) => {
		set((state: BookState) => {
			const updatedBooks: Book[] = state.books.map((book) =>
				book.key === bookToMove.key ? { ...book, status: newStatus } : book,
			)
			localStorage.setItem("readingList", JSON.stringify(updatedBooks))
			return { books: updatedBooks }
		})
	},
	loadBooksFromLocalStorage: () => {
		// Runs after the component has been rendered (mounted).
		const storedBooks = localStorage.getItem("readingList")
		// Check if there are any books stored in the local storage.
		if (storedBooks) {
			set({ books: JSON.parse(storedBooks) })
		} else {
			set({ books: initialBooks })
		}
	},
	reorderBooks: (
		listType: Book["status"],
		startIndex: number,
		endIndex: number,
	) => {
		set((state: BookState) => {
			const filteredBooks = state.books.filter(
				(book) => book.status === listType,
			)
			const [reorderedBook] = filteredBooks.splice(startIndex, 1)
			filteredBooks.splice(endIndex, 0, reorderedBook)
			const updatedBooks: Book[] = state.books.map((book) =>
				book.status === listType ? filteredBooks.shift() || book : book,
			)
			localStorage.setItem("readingList", JSON.stringify(updatedBooks))
			return { books: updatedBooks }
		})
	},
}))
