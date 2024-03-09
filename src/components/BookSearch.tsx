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
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"

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
		<div className="-m-1.5 mt-5 overflow-x-auto pt-5">
			<div className="sm:dark: sm:dark:background    sm:rounded-2xl  ">
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
				<div
					className=" max-h-[400px] max-w-full overflow-y-auto
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-thumb]:bg-slate-500
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  dark:[&::-webkit-scrollbar-track]:bg-slate-700
  [&::-webkit-scrollbar]:w-2"
				>
					{query.length > 0 && totalResults > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Title</TableHead>
									<TableHead>Author</TableHead>
									<TableHead className="hidden sm:table-cell">Year</TableHead>
									<TableHead className="hidden sm:table-cell">
										Page Count
									</TableHead>
									<TableHead></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className="overflow-y-auto">
								{result.map((book) => (
									<TableRow>
										<TableCell>{book.title}</TableCell>
										<TableCell>{book.author_name}</TableCell>
										<TableCell className="hidden sm:table-cell">
											{book.first_publish_year}
										</TableCell>
										<TableCell className="hidden sm:table-cell">
											{book.number_of_pages_median || "_"}
										</TableCell>
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
						<div className="flex max-h-60 items-center justify-center  p-16 text-gray-600 dark:text-gray-400">
							Start your Search!
						</div>
					)}
				</div>
				{query.length > 0 && totalResults > 0 ? (
					<div className="mt-4 flex items-center justify-between pt-2">
						<Button
							variant={"outline"}
							disabled={currentPage <= 1 || isLoading}
							onClick={prevPageHandler}
						>
							<SlArrowLeft className="size-4" />
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
							<SlArrowRight className="size-4" />
						</Button>
					</div>
				) : (
					<div></div>
				)}
				{query.length > 0 && totalResults > 0 ? (
					<div className="mt-2 flex justify-center pt-4 text-xs text-gray-700 dark:text-gray-500">
						{totalResults > 0 && (
							<p className="text-sm">
								Showing {startIndex} - {endIndex} out of {totalResults} results
							</p>
						)}
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	)
}

import { useMediaQuery } from "@/hooks/use-media-query"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"

export function SearchDialog({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">Search for a Book</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-xl">
					<DialogHeader>
						<DialogTitle>Search for a Book</DialogTitle>
						{children}
					</DialogHeader>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">Search for a Book</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Search for a Book</DrawerTitle>
					{children}
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	)
}
