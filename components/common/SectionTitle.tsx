interface Props {
    mb?: string;
    title: string;
    width?: string;
    center?: boolean;
    paragraph: string;
}

export default function SectionTitle({
    title,
    paragraph,
    width = "570px",
    center,
    mb = "100px",
}:
    Props
) {
    return (
        <>
            <div
                className={`w-full ${center ? "mx-auto text-center" : ""}`}
                style={{ maxWidth: width, marginBottom: mb }}
            >
                <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                    {title}
                </h2>
                <p className="text-base !leading-relaxed text-body-color md:text-lg">
                    {paragraph}
                </p>
            </div>
        </>
    );
};