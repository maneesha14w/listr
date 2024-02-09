import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import { Book, useStore } from "@/store"
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from "@hello-pangea/dnd"

export const BookList = () => {
	const { books, moveBook, removeBook, reorderBooks } = useStore(
		(state) => state,
	)

	const moveToList = (book: Book, targetList: Book["status"]) => {
		moveBook(book, targetList)
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
			<CardFooter className="flex justify-between">
				<Button
					variant="destructive"
					onClick={() => {
						removeBook(book)
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
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
							moveToList(book, "saved")
						}}
						disabled={btnType === "saved"}
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

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return

		const sourceIndex = result.source.index
		const destinationIndex = result.destination.index
		const listType = result.source.droppableId as Book["status"]
		reorderBooks(listType, sourceIndex, destinationIndex)
	}

	const renderDraggableBookList = (listType: Book["status"]) => {
		const filteredBooks = books.filter((book) => book.status === listType)
		return (
			// define drop zone
			<Droppable droppableId={listType}>
				{(provided) => (
					//entire droppable area
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{filteredBooks.map((book, index) => (
							//every draggable item
							<Draggable key={book.key} draggableId={book.key} index={index}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										className="my-2"
									>
										<div {...provided.dragHandleProps}>
											{renderBookItem(book, index, listType)}
										</div>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		)
	}

	return (
		<div className="mt-20 space-y-8 p-4">
			<h2 className="mb-4 text-3xl font-bold">My Reading List</h2>
			<DragDropContext onDragEnd={onDragEnd}>
				{books.filter((book) => book.status === "reading").length > 0 && (
					<>
						<h3 className="mb-2 text-xl font-semibold">Reading</h3>
						{renderDraggableBookList("reading")}
					</>
				)}
			</DragDropContext>
			<DragDropContext onDragEnd={onDragEnd}>
				{books.filter((book) => book.status === "saved").length > 0 && (
					<>
						<h3 className="mb-2 text-xl font-semibold">To Read</h3>
						<div>{renderDraggableBookList("saved")}</div>
					</>
				)}
			</DragDropContext>
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
