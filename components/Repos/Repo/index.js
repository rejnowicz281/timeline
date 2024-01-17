"use client";

import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import css from "../index.module.css";

export default function Repo({ repo }) {
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
}
