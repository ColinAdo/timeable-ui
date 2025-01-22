import Link from "next/link";

const Hero = () => {
    return (
        <>
            <section
                id="home"
                className="relative dark:bg-neutral-950 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
            >
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[800px] text-center">
                                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                                    Automatic timetable Generator
                                </h1>
                                <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                                    Our Timeatable is a timetable Generator which simplifies
                                    scheduling for higher institutions by transforming your uploaded
                                    Excel file into a fully functional timetable. This web app
                                    automatically processes class schedules, lecturer availability,
                                    and room allocations, ensuring efficient and conflict-free
                                    timetables.
                                </p>
                                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                    <Link
                                        href="/auth/login"
                                        className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                                    >
                                        Free trial
                                    </Link>
                                    <Link
                                        href="/auth/login"
                                        className="rounded-sm bg-primary px-8 py-4 text-base font-semibold dark:text-black text-white duration-300 ease-in-out hover:bg-primary/80"
                                    >
                                        🔥 Get Pro
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
