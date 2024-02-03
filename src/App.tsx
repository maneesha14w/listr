import React, { useEffect, useState } from "react"
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

	const addBook = (newBook: Book) => {
		const updatedBooks = [
			...books,
			{ ...newBook, status: newBook.status as "backlog" },
		]
		setBooks(updatedBooks)

		localStorage.setItem("readingList", JSON.stringify(updatedBooks))
	}

	const moveBook = (book: Book) => {}

	return (
		<div className="container mx-auto">
			<BookSearch onAddBook={addBook} />
			<BookList books={books}></BookList>
		</div>
	)
}

export default App
