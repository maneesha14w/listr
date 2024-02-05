import { Book } from "./BookSearch"
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"

export const BookList = ({
	books,
	onMoveBook,
}: {
	books: Book[]
	onMoveBook: (book: Book, targetList: Book["status"]) => void
}) => {
	const moveToList = (book: Book, targetList: Book["status"]) => {
		onMoveBook(book, targetList)
	}

	const renderBookItem = (book: Book, index: number) => (
		<Card key={index}>
			<CardHeader>
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>{book.author_name}</CardDescription>
			</CardHeader>
			<CardFooter>
				<div className="inline-flex gap-5">
					<Button
						variant="outline"
						onClick={() => {
							moveToList(book, "reading")
						}}
					>
						Currently Reading
					</Button>
					<Button
						variant="outline"
						onClick={() => {
							moveToList(book, "toRead")
						}}
					>
						Saved
					</Button>
					<Button
						variant="outline"
						onClick={() => {
							moveToList(book, "complete")
						}}
					>
						Complete
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
	return (
		<div className="space-y-8 p-4">
			<h2 className="mb-4 text-2xl font-bold">My Reading List</h2>
			{books.filter((book) => book.status === "reading").length > 0 && (
				<>
					<h3 className="mb-2 text-xl font-semibold">Reading</h3>
					<div>
						{books
							.filter((book) => book.status === "reading")
							.map((book, index) => renderBookItem(book, index))}
					</div>
				</>
			)}
			{books.filter((book) => book.status === "toRead").length > 0 && (
				<>
					<h3 className="mb-2 text-xl font-semibold">To Read</h3>
					<div>
						{books
							.filter((book) => book.status === "toRead")
							.map((book, index) => renderBookItem(book, index))}
					</div>
				</>
			)}
			{books.filter((book) => book.status === "complete").length > 0 && (
				<>
					<h3 className="mb-2 text-xl font-semibold">Completed</h3>
					<div>
						{books
							.filter((book) => book.status === "complete")
							.map((book, index) => renderBookItem(book, index))}
					</div>
				</>
			)}
		</div>
	)
}
