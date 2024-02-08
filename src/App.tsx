import { useEffect } from "react"
import { BookSearch } from "./components/BookSearch"
import { BookList } from "./components/BookList"
import { useStore } from "./store"
import "./App.css" // Import app.css

const App = () => {
	const { loadBooksFromLocalStorage } = useStore((state) => state)
	useEffect(() => {
		loadBooksFromLocalStorage()
	}, [loadBooksFromLocalStorage])
	return (
		<div className="container mx-auto">
			<BookSearch />
			<BookList />
		</div>
	)
}

export default App
