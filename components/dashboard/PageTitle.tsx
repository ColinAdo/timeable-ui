interface TitleProps {
    title: string;
    className?: string;
}

export default function PageTitle({ title, className }: TitleProps) {
    return <h1 className="text-2xl font-semibold w-full text-gray-200">{title}</h1>;
}
