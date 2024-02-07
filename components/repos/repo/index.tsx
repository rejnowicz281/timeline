"use client";

import { ReposData } from "@/types/repos";
import { formatDate } from "@/utils/format-date";
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
            className={`group/repo even:self-end odd:self-start flex flex-col even:items-start odd:items-end odd:ml-[2px] relative w-1/2${
                visible ? " visible" : ""
            }`}
        >
            <a
                href={repo.html_url}
                className={`z-10 group-even/repo:translate-x-[-11.5px] group-odd/repo:translate-x-[11.5px] absolute w-6 h-6 rounded-[50%] bg-red-400 top-8 opacity-0 transition-colors hover:bg-red-300 group-[.visible]/repo:animate-fade-in`}
            ></a>
            <a
                href={repo.html_url}
                ref={ref}
                className={`py-8 opacity-0 group/content flex flex-col group-odd/repo:items-end group-odd/repo:border-r-2 group-even/repo:border-l-2 group-odd/repo:border-r-gray-500 group-even/repo:border-l-gray-500 group-even/repo:pl-7 group-odd/repo:pr-7 group-[:nth-child(even).visible]/repo:animate-right-slide-in group-[:nth-child(odd).visible]/repo:animate-left-slide-in`}
            >
                {repo.created_at && <div className="text-red-400">{formatDate(repo.created_at)}</div>}
                <div className="group-hover/content:underline my-3">{repo.name}</div>
                {repo.language && <div className="text-sm text-gray-500"> {repo.language}</div>}
            </a>
        </div>
    );
};

export default Repo;
