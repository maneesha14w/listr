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
import { Book, useStore } from "@/store"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export const BookSearch = () => {
	const { books, addBook } = useStore((state) => state)
	// State variables
	const [query, setQuery] = useState("")
	const [result, setResults] = useState<Book[]>([])
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
			// Fetch data from Open Library API
			const response: SearchResult = await fetch(
				`https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}`,
			)
				.then((response) => response.json())
				.catch((error) => console.error(error))
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
		<div className="-m-1.5 mt-5 overflow-x-auto">
			<div className="sm:dark: sm:dark:background  sm:divide-y sm:divide-gray-200 sm:rounded-2xl sm:dark:divide-gray-700 sm:dark:border-gray-700">
				<div className="col flex flex-col items-center justify-center gap-5 pb-10 sm:flex-row">
					<div className=" relative w-full sm:max-w-xs">
						<Input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search for your next book"
							onKeyUp={handleKeyPress}
						/>
					</div>
					<Button
						className="max-sm:w-full sm:max-w-xs"
						onClick={() => {
							searchBooks()
						}}
						disabled={isLoading ? true : false}
					>
						{isLoading ? (
							<>
								<AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
								Searching..
							</>
						) : (
							"Search"
						)}
					</Button>
				</div>
				{/* <div className="mt-2">
					{totalResults > 0 && (
						<p className="text-sm">
							Showing {startIndex} - {endIndex} out of {totalResults} results
						</p>
					)}
				</div> */}
				<div className="mb-4 mt-4 max-h-64 overflow-auto">
					{query.length > 0 && result.length > 0 ? (
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
													addBook({
														key: book.key,
														title: book.title,
														author_name: book.author_name,
														first_publish_year: book.first_publish_year,
														number_of_pages_median: book.number_of_pages_median,
														status: "saved",
													})
												}}
												disabled={books.some((b) => b.key === book.key)}
											>
												Add
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<div className=" flex max-h-60 items-center justify-center p-16">
							Start your Search!
						</div>
					)}
				</div>
				{query.length > 0 && result.length > 0 ? (
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
								currentPage >= Math.ceil(totalResults / resultsPerPage) ||
								isLoading
							}
							onClick={nextPageHandler}
						>
							Next
						</Button>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	)
}
