import { useEffect } from "react"
import { BookSearch, SearchDialog } from "./components/BookSearch"
import { BookList } from "./components/BookList"
import { useStore } from "./store"
import "./App.css" // Import app.css
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./components/ui/Layout"
import { TooltipProvider } from "@radix-ui/react-tooltip"

const App = () => {
	const { loadBooksFromLocalStorage } = useStore((state) => state)
	useEffect(() => {
		loadBooksFromLocalStorage()
	}, [loadBooksFromLocalStorage])
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Layout>
				<div className="container mx-auto">
					<TooltipProvider>
						<BookList />
					</TooltipProvider>
				</div>
			</Layout>
		</ThemeProvider>
	)
}

export default App
