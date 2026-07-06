import { cn } from "@/lib/utils";

type SectionProps = React.ComponentPropsWithoutRef<"section">;

function Section({ className, children, ...props }: SectionProps) {
	return (
		<section
			className={cn(
				"mx-auto w-full px-4 sm:px-6 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl",
				className
			)}
			{...props}
		>
			{children}
		</section>
	);
}

type WrapImageSectionProps = SectionProps & {
	image: React.ReactNode;
	image_left?: boolean;
	imageClassName?: string;
	contentClassName?: string;
};

function WrapImageSection({
	image,
	image_left = false,
	imageClassName,
	contentClassName,
	className,
	children,
	...props
}: WrapImageSectionProps) {
	return (
		<Section className={cn("py-8", className)} {...props}>
			<div className="flow-root">
				<div
					className={cn(
						"mb-3 w-full sm:max-w-sm md:max-w-md",
						image_left ? "md:float-left md:mr-6" : "md:float-right md:ml-6",
						imageClassName
					)}
				>
					{image}
				</div>

				<div className={cn("space-y-4", contentClassName)}>{children}</div>
			</div>
		</Section>
	);
}

type ImageSectionProps = SectionProps & {
	image: React.ReactNode;
	image_left?: boolean;
	imageClassName?: string;
	contentClassName?: string;
};

function ImageSection({
	image,
	image_left = false,
	imageClassName,
	contentClassName,
	className,
	children,
	...props
}: ImageSectionProps) {
	return (
		<Section className={cn("py-8", className)} {...props}>
			<div className="grid items-start gap-8 md:grid-cols-2">
				<div
					className={cn(
						image_left ? "order-1 md:order-1" : "order-2 md:order-2",
						imageClassName
					)}
				>
					{image}
				</div>

				<div
					className={cn(
						"space-y-4",
						image_left ? "order-2 md:order-2" : "order-1 md:order-1",
						contentClassName
					)}
				>
					{children}
				</div>
			</div>
		</Section>
	);
}

export { ImageSection, WrapImageSection, Section };
export default Section;

