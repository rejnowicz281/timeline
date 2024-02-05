"use client";

import { ReposData } from "@/types/repos";
import { formatDate } from "@/utils/format-date";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import css from "../index.module.css";

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
        <div className={`${css.repo}${visible ? ` ${css.visible}` : ""}`}>
            <a href={repo.html_url} className={css["repo-flag"]}></a>
            <a href={repo.html_url} ref={ref} className={css["repo-content"]}>
                {repo.created_at && <div className={css["repo-date"]}>{formatDate(repo.created_at)}</div>}
                <div className={css["repo-name"]}>{repo.name}</div>
                {repo.language && <div className={css["repo-language"]}> {repo.language}</div>}
            </a>
        </div>
    );
};

export default Repo;
