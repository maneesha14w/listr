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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@radix-ui/react-tooltip"

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
		<Card
			className="rounded-none first:mt-0 first:rounded-t-lg last:rounded-b-lg"
			key={index}
		>
			<CardHeader>
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>{book.author_name}</CardDescription>
			</CardHeader>
			<CardFooter className="flex justify-between">
				<Tooltip>
					<TooltipTrigger asChild>
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
					</TooltipTrigger>
					<TooltipContent>Delete</TooltipContent>
				</Tooltip>
				<div className="inline-flex gap-5">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								onClick={() => {
									moveToList(book, "reading")
								}}
								disabled={btnType === "reading"}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path
										d="M12.088 4.82a10 10 0 0 1 9.412 .314a1 1 0 0 1 .493 .748l.007 .118v13a1 1 0 0 1 -1.5 .866a8 8 0 0 0 -8 0a1 1 0 0 1 -1 0a8 8 0 0 0 -7.733 -.148l-.327 .18l-.103 .044l-.049 .016l-.11 .026l-.061 .01l-.117 .006h-.042l-.11 -.012l-.077 -.014l-.108 -.032l-.126 -.056l-.095 -.056l-.089 -.067l-.06 -.056l-.073 -.082l-.064 -.089l-.022 -.036l-.032 -.06l-.044 -.103l-.016 -.049l-.026 -.11l-.01 -.061l-.004 -.049l-.002 -.068v-13a1 1 0 0 1 .5 -.866a10 10 0 0 1 9.412 -.314l.088 .044l.088 -.044z"
										strokeWidth="0"
										fill="currentColor"
									/>
								</svg>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Start Reading</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								onClick={() => {
									moveToList(book, "saved")
								}}
								disabled={btnType === "saved"}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
									<path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
									<path d="M5 8h4" />
									<path d="M9 16h4" />
									<path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
									<path d="M14 9l4 -1" />
									<path d="M16 16l3.923 -.98" />
								</svg>
							</Button>
						</TooltipTrigger>
						<TooltipContent>To Read</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								onClick={() => {
									moveToList(book, "complete")
								}}
								disabled={btnType === "complete"}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M7 12l5 5l10 -10" />
									<path d="M2 12l5 5m5 -5l5 -5" />
								</svg>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Complete</TooltipContent>
					</Tooltip>
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
						<h3 className="mb-2 flex items-center gap-3 text-xl font-semibold">
							Reading
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path
									d="M12.088 4.82a10 10 0 0 1 9.412 .314a1 1 0 0 1 .493 .748l.007 .118v13a1 1 0 0 1 -1.5 .866a8 8 0 0 0 -8 0a1 1 0 0 1 -1 0a8 8 0 0 0 -7.733 -.148l-.327 .18l-.103 .044l-.049 .016l-.11 .026l-.061 .01l-.117 .006h-.042l-.11 -.012l-.077 -.014l-.108 -.032l-.126 -.056l-.095 -.056l-.089 -.067l-.06 -.056l-.073 -.082l-.064 -.089l-.022 -.036l-.032 -.06l-.044 -.103l-.016 -.049l-.026 -.11l-.01 -.061l-.004 -.049l-.002 -.068v-13a1 1 0 0 1 .5 -.866a10 10 0 0 1 9.412 -.314l.088 .044l.088 -.044z"
									strokeWidth="0"
									fill="currentColor"
								/>
							</svg>
						</h3>
						{renderDraggableBookList("reading")}
					</>
				)}
			</DragDropContext>
			<DragDropContext onDragEnd={onDragEnd}>
				{books.filter((book) => book.status === "saved").length > 0 && (
					<>
						<h3 className="mb-2 flex items-center gap-3 text-xl font-semibold">
							To Read
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
								<path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
								<path d="M5 8h4" />
								<path d="M9 16h4" />
								<path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
								<path d="M14 9l4 -1" />
								<path d="M16 16l3.923 -.98" />
							</svg>
						</h3>
						<div>{renderDraggableBookList("saved")}</div>
					</>
				)}
			</DragDropContext>
			{books.filter((book) => book.status === "complete").length > 0 && (
				<>
					<h3 className="mb-2 flex items-center gap-3 text-xl font-semibold">
						Completed
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M7 12l5 5l10 -10" />
							<path d="M2 12l5 5m5 -5l5 -5" />
						</svg>
					</h3>
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
