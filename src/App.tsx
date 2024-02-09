import { useEffect } from "react"
import { BookSearch } from "./components/BookSearch"
import { BookList } from "./components/BookList"
import { useStore } from "./store"
import "./App.css" // Import app.css
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./components/ui/Layout"

const App = () => {
	const { loadBooksFromLocalStorage } = useStore((state) => state)
	useEffect(() => {
		loadBooksFromLocalStorage()
	}, [loadBooksFromLocalStorage])
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Layout>
				<div className="container mx-auto">
					<BookSearch />
					<BookList />
				</div>
			</Layout>
		</ThemeProvider>
	)
}

export default App
