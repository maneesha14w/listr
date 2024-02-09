import { ImBooks } from "react-icons/im"
import { ModeToggle } from "./ui/mode-toggle"

// A navbar component that will be used to house app-wide navigation and settings
export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background dark:border-stone-700">
			<div className="flex h-16 items-center px-10 sm:px-16 lg:px-44">
				<div className="mx-auto w-full max-w-3xl space-y-20">
					<div className="flex justify-between">
						<div className="flex flex-1 items-center justify-start">
							{/* Link and site name/icon */}
							<a
								className="inline-flex h-10 items-center justify-center text-nowrap text-lg font-bold"
								href="/"
							>
								<ImBooks className="size-full" />
								<span className="ml-5 max-sm:hidden">Listr</span>
							</a>
						</div>
						<div className="flex flex-1 items-center justify-end">
							<div className="flex items-center space-x-1">
								<ModeToggle></ModeToggle>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
