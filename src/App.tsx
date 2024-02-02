import React, { useEffect, useState } from "react"
import { Book, BookSearch } from "./components/BookSearch"

const App = () => {
	const [books, setBooks] = useState<Book[]>([])

	useEffect(() => {
		const storedBooks = localStorage.getItem("readingList")
		if (storedBooks) {
			setBooks(JSON.parse(storedBooks))
		}
	}, [])

	return (
		<div className="container mx-auto">
			<BookSearch />
		</div>
	)
}

export default App
