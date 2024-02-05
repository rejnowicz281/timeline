"use client";

import fetchRepos from "@/actions/fetch-repos";
import { ReposData } from "@/types/repos";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import RepoList from "../repo-list";
import css from "./index.module.css";

export type LoadMoreProps = {
    user: string;
};

const LoadMore: FC<LoadMoreProps> = ({ user }) => {
    const [page, setPage] = useState<number>(1);
    const [repos, setRepos] = useState<ReposData>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) loadMoreRepos();
    }, [inView]);

    const loadMoreRepos = async () => {
        const nextPage = page + 1;

        const data = await fetchRepos(user, nextPage);

        if (data.error) return setLoading(false);

        if ("last" in data && data.last) setLoading(false); // Avoid unecessary API calls
        else setPage(page + 1);

        if ("repos" in data) setRepos([...repos, ...data.repos]);
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
};

export default LoadMore;
