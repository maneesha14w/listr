import { useEffect, useState } from "react"
import { Book, BookSearch } from "./components/BookSearch"
import { BookList } from "./components/BookList"

const App = () => {
	useEffect(() => {}, [])
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
