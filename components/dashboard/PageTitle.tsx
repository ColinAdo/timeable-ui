interface TitleProps {
    title: string;
    className?: string;
}

export default function PageTitle({ title, className }: TitleProps) {
    return <h1 className="text-2xl font-semibold w-full text-purple-500">{title}</h1>;
}
