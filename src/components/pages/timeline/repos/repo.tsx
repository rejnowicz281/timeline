import { ReposData } from "@/lib/types/repos";
import { cn, formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export type RepoProps = {
    repo: ReposData[0];
};

const Repo: FC<RepoProps> = ({ repo }) => {
    const { ref, inView } = useInView();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (inView && !visible) setVisible(true);
    }, [inView]);

    return (
        <div
            className={cn(
                "group/repo even:self-end odd:self-start flex flex-col even:items-start odd:items-end odd:ml-[2px] relative w-1/2",
                visible && "visible"
            )}
        >
            <a
                href={repo.homepage || repo.html_url}
                className="z-10 group-even/repo:translate-x-[-11.5px] group-odd/repo:translate-x-[11.5px] absolute w-6 h-6 rounded-[50%] bg-red-500 top-8 opacity-0 [transition:opacity_1s,background_150ms] hover:bg-red-300 group-[.visible]/repo:opacity-100"
            ></a>
            <a
                href={repo.html_url}
                ref={ref}
                className="py-8 group/content flex flex-col gap-3 group-odd/repo:items-end group-odd/repo:border-r-2 group-even/repo:border-l-2 group-odd/repo:border-r-gray-500 group-even/repo:border-l-gray-500"
            >
                <div className="flex items-center group-odd/repo:flex-row-reverse group-odd/repo:pr-3 group-even/repo:pl-3 [transition:opacity_1s,transform_300ms] opacity-0 group-odd/repo:-translate-x-full group-even/repo:translate-x-full group-[.visible]/repo:opacity-100 group-[:nth-child(odd).visible]/repo:-translate-x-0 group-[:nth-child(even).visible]/repo:translate-x-0">
                    <ChevronLeft size={20} className="group-odd/repo:rotate-180" />
                    <div className="group-hover/content:underline text-2xl">{repo.name}</div>
                </div>
                <div className="px-9 group-odd/repo:text-end space-y-3">
                    {repo.created_at && (
                        <div className="text-sm dark:text-gray-400 [transition:opacity_1s,transform_400ms] opacity-0 group-odd/repo:-translate-x-full group-even/repo:translate-x-full group-[.visible]/repo:opacity-100 group-[:nth-child(odd).visible]/repo:-translate-x-0 group-[:nth-child(even).visible]/repo:translate-x-0">
                            Created · <span className="font-semibold">{formatDate(repo.created_at)}</span>
                        </div>
                    )}
                    {repo.pushed_at && (
                        <div className="text-sm dark:text-gray-400 [transition:opacity_1s,transform_500ms] opacity-0 group-odd/repo:-translate-x-full group-even/repo:translate-x-full group-[.visible]/repo:opacity-100 group-[:nth-child(odd).visible]/repo:-translate-x-0 group-[:nth-child(even).visible]/repo:translate-x-0">
                            Last update · <span className="font-semibold">{formatDate(repo.pushed_at)}</span>
                        </div>
                    )}

                    {repo.description && (
                        <div className="text-sm text-gray-500 [transition:opacity_1s,transform_600ms] opacity-0 group-odd/repo:-translate-x-full group-even/repo:translate-x-full group-[.visible]/repo:opacity-100 group-[:nth-child(odd).visible]/repo:-translate-x-0 group-[:nth-child(even).visible]/repo:translate-x-0">
                            {repo.description}
                        </div>
                    )}
                    {repo.language && (
                        <div className="text-sm font-semibold dark:font-normal text-red-400 [transition:opacity_1s,transform_700ms] opacity-0 group-odd/repo:-translate-x-full group-even/repo:translate-x-full group-[.visible]/repo:opacity-100 group-[:nth-child(odd).visible]/repo:-translate-x-0 group-[:nth-child(even).visible]/repo:translate-x-0">
                            {repo.language}
                        </div>
                    )}
                </div>
            </a>
        </div>
    );
};

export default Repo;
