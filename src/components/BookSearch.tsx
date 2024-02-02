import axios from "axios"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const BookSearch = () => {
	const [query, setQuery] = useState("")
	const [result, setResults] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState(false)

	type SearchResult = {
		docs: any[]
		start: number
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
	return (
		<div className=" p-4">
			<div className="sm:max-w-xs">
				<Input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for your next book"
				/>
			</div>
			<Button
				onClick={() => {
					searchBooks()
				}}
			>
				{isLoading ? "Searching" : "Search"}
			</Button>
			<div className="mt-4 max-h-64 overflow-auto">
				<ul>
					{result.map((book, index) => (
						<li key={index}>{JSON.stringify(book, null, 2)}</li>
					))}
				</ul>
			</div>
		</div>
	)
}
