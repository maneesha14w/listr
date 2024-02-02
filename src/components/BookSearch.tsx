import axios from "axios"
import React, { useState } from "react"

export const BookSearch = () => {
	const [query, setQuery] = useState(0)
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
	return <div className="p-4"></div>
}
