import axios from "axios"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

export type Book = {
	key: string
	title: string
	author_name: string
	first_publish_year: string
	number_of_pages_median: string
	status: "done" | "inProgress" | "backlog"
}

export const BookSearch = () => {
	const [query, setQuery] = useState("")
	const [result, setResults] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState(false)

	type SearchResult = {
		docs: any[]
		num_found: number
	}

	const searchBooks = async () => {
		if (!query) return

		setIsLoading(true)
		try {
			const response = await axios.get<SearchResult>(
				`https://openlibrary.org/search.json?q=${query}`,
			)
			setResults(response.data.docs)
		} catch (error) {
			console.error("Error fetching Open Library Data", error)
		}
		setIsLoading(false)
	}

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			searchBooks()
		}
	}

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
			<div className="mt-4 max-h-64 overflow-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="p-2 ">Title</TableHead>
							<TableHead className="p-2">Author</TableHead>
							<TableHead className="p-2">Year</TableHead>
							<TableHead className="p-2">Page Count</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{result.map((book, index) => (
							<TableRow>
								<TableCell>{book.title}</TableCell>
								<TableCell>{book.author_name}</TableCell>
								<TableCell>{book.first_publish_year}</TableCell>
								<TableCell>{book.number_of_pages_median || "_"}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
