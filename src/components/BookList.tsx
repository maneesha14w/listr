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
	onRemoveBook,
}: {
	books: Book[]
	onMoveBook: (book: Book, targetList: Book["status"]) => void
	onRemoveBook: (book: Book) => void
}) => {
	const moveToList = (book: Book, targetList: Book["status"]) => {
		onMoveBook(book, targetList)
	}

	const renderBookItem = (
		book: Book,
		index: number,
		btnType: Book["status"],
	) => (
		<Card key={index}>
			<CardHeader>
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>{book.author_name}</CardDescription>
			</CardHeader>
			<CardFooter className="justify-between">
				<Button
					variant="destructive"
					onClick={() => {
						onRemoveBook(book)
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M4 7l16 0" />
						<path d="M10 11l0 6" />
						<path d="M14 11l0 6" />
						<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
						<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
					</svg>
				</Button>
				<div className="inline-flex gap-5">
					<Button
						variant="outline"
						onClick={() => {
							moveToList(book, "reading")
						}}
						disabled={btnType === "reading"}
					>
						Currently Reading
					</Button>
					<Button
						variant="outline"
						onClick={() => {
							moveToList(book, "toRead")
						}}
						disabled={btnType === "toRead"}
					>
						Saved
					</Button>
					<Button
						variant="outline"
						onClick={() => {
							moveToList(book, "complete")
						}}
						disabled={btnType === "complete"}
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
							.map((book, index) => renderBookItem(book, index, "reading"))}
					</div>
				</>
			)}
			{books.filter((book) => book.status === "toRead").length > 0 && (
				<>
					<h3 className="mb-2 text-xl font-semibold">To Read</h3>
					<div>
						{books
							.filter((book) => book.status === "toRead")
							.map((book, index) => renderBookItem(book, index, "toRead"))}
					</div>
				</>
			)}
			{books.filter((book) => book.status === "complete").length > 0 && (
				<>
					<h3 className="mb-2 text-xl font-semibold">Completed</h3>
					<div>
						{books
							.filter((book) => book.status === "complete")
							.map((book, index) => renderBookItem(book, index, "complete"))}
					</div>
				</>
			)}
		</div>
	)
}
