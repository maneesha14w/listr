import { useEffect, useState } from "react"
import { Book, BookSearch } from "./components/BookSearch"
import { BookList } from "./components/BookList"

const App = () => {
	const [books, setBooks] = useState<Book[]>([])

	useEffect(() => {
		// This function runs after the component has been rendered (mounted).
		const storedBooks = localStorage.getItem("readingList")
		// Check if there are any books stored in the local storage.
		if (storedBooks) {
			setBooks(JSON.parse(storedBooks))
		}
	}, [])

	const addBook = (newBook: Book) => {}

	const moveBook = (bookToMove: Book, newStatus: Book["status"]) => {
		const updatedBooks: Book[] = books.map((book) =>
			book.key === bookToMove.key ? { ...book, status: newStatus } : book,
		)

		setBooks(updatedBooks)
		localStorage.setItem("readingList", JSON.stringify(updatedBooks))
	}

	const removeBook = (bookToRemove: Book) => {
		if (
			window.confirm(`Are you sure you want to remove ${bookToRemove.title}?`)
		) {
			const updatedBooks: Book[] = books.filter(
				(book) => book.key !== bookToRemove.key,
			)
			setBooks(updatedBooks)
			localStorage.setItem("readingList", JSON.stringify(updatedBooks))
		}
	}

	return (
		<div className="container mx-auto">
			<BookSearch onAddBook={addBook} />
			<BookList
				books={books}
				onMoveBook={moveBook}
				onRemoveBook={removeBook}
			></BookList>
		</div>
	)
}

export default App
