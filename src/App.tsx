import { useEffect } from "react"
import { BookSearch } from "./components/BookSearch"
import { BookList } from "./components/BookList"
import { useStore } from "./store"
import "./App.css" // Import app.css
import { ThemeProvider } from "./components/theme-provider"

const App = () => {
	const { loadBooksFromLocalStorage } = useStore((state) => state)
	useEffect(() => {
		loadBooksFromLocalStorage()
	}, [loadBooksFromLocalStorage])
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="container mx-auto">
				<BookSearch />
				<BookList />
			</div>
		</ThemeProvider>
	)
}

export default App
