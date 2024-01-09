"use client";

import fetchRepos from "@/actions/fetchRepos";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import RepoList from "../RepoList";
import css from "./index.module.css";

export default function LoadMore({ user }) {
    const [page, setPage] = useState(1);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) loadMoreRepos();
    }, [inView]);

    const loadMoreRepos = async () => {
        const nextPage = page + 1;

        const data = await fetchRepos(user, nextPage);

        if (data.error) return setLoading(false);

        if (data.last) setLoading(false); // Avoid unecessary API calls
        else setPage(page + 1);

        setRepos([...repos, ...data.repos]);
    };

    return (
        <>
            <RepoList repos={repos} />
            {loading && (
                <div className={css.loading} ref={ref}>
                    Loading...
                </div>
            )}
        </>
    );
}
