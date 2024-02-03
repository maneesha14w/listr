import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

export type Book = {
	key: string
	title: string
	author_name: string[]
	first_publish_year: string
	number_of_pages_median: string | null
	status: "done" | "inProgress" | "backlog"
}

export const BookSearch = ({
	onAddBook,
}: {
	onAddBook: (book: Book) => void
}) => {
	// State variables
	const [query, setQuery] = useState("")
	const [result, setResults] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [totalResults, setTotalResults] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const resultsPerPage = 100

	//structure of the API response
	type SearchResult = {
		docs: any[]
		num_found: number
	}

	//Async function to search books based on the query and page number.
	const searchBooks = async (page: number = 1) => {
		if (!query) return

		setIsLoading(true)
		try {
			// Fetch data from Open Library API using Fetch
			const response = await fetch(
				`https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}`,
			).then((response) => response.json())
			// Set state variables based on API response
			setResults(response.docs)
			setTotalResults(response.num_found)
			setCurrentPage(page)
		} catch (error) {
			console.error("Error fetching Open Library Data", error)
		}
		setIsLoading(false)
	}

	// Handler for navigating to the previous page
	const prevPageHandler = () => {
		if (currentPage > 1) {
			searchBooks(currentPage - 1)
		}
	}
	// Handler for navigating to the next page
	const nextPageHandler = () => {
		if (currentPage < Math.ceil(totalResults / resultsPerPage)) {
			searchBooks(currentPage + 1)
		}
	}

	// Handler for Enter key press in the search input
	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			searchBooks()
		}
	}

	const startIndex = (currentPage - 1) * resultsPerPage + 1
	const endIndex = Math.min(startIndex + resultsPerPage - 1, totalResults)

	// JSX structure for rendering the component
	return (
		<div className=" p-4">
			<div className="sm:max-w-xs">
				<Input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for your next book"
					onKeyUp={handleKeyPress}
				/>
			</div>
			<Button
				onClick={() => {
					searchBooks()
				}}
				disabled={isLoading ? true : false}
			>
				{isLoading ? "Searching" : "Search"}
			</Button>
			<div className="mt-2">
				{totalResults > 0 && (
					<p className="text-sm">
						Showing {startIndex} - {endIndex} out of {totalResults} results
					</p>
				)}
			</div>
			<div className="mt-4 max-h-64 overflow-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="p-2 ">Title</TableHead>
							<TableHead className="p-2">Author</TableHead>
							<TableHead className="p-2">Year</TableHead>
							<TableHead className="p-2">Page Count</TableHead>
							<TableHead className="p-2"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{result.map((book) => (
							<TableRow>
								<TableCell>{book.title}</TableCell>
								<TableCell>{book.author_name}</TableCell>
								<TableCell>{book.first_publish_year}</TableCell>
								<TableCell>{book.number_of_pages_median || "_"}</TableCell>
								<TableCell>
									<Button
										variant="link"
										onClick={() => {
											onAddBook({
												key: book.key,
												title: book.title,
												author_name: book.author_name,
												first_publish_year: book.first_publish_year,
												number_of_pages_median: book.number_of_pages_median,
												status: "backlog",
											})
										}}
									>
										Add
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="mt-4 flex items-center justify-between">
				<Button
					variant={"outline"}
					disabled={currentPage <= 1 || isLoading}
					onClick={prevPageHandler}
				>
					Previous
				</Button>
				<span>{`Page ${currentPage}`}</span>
				<Button
					variant={"outline"}
					disabled={
						currentPage >= Math.ceil(totalResults / resultsPerPage) || isLoading
					}
					onClick={nextPageHandler}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
