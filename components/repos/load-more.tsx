"use client";

import fetchRepos from "@/actions/fetch-repos";
import { ReposData } from "@/types/repos";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import RepoList from "./repo-list";

export type LoadMoreProps = {
    user: string;
};

const LoadMore: FC<LoadMoreProps> = ({ user }) => {
    const [page, setPage] = useState<number>(1);
    const [repos, setRepos] = useState<ReposData>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();

    const { ref, inView } = useInView();

    // Reset repos and page when searchParams change
    useEffect(() => {
        setRepos([]);
        setPage(1);
        setLoading(true);
    }, [searchParams]);

    useEffect(() => {
        if (inView) loadMoreRepos();
    }, [inView]);

    const loadMoreRepos = async () => {
        const nextPage = page + 1;
        const sort = searchParams.get("sort") === "created" || !searchParams.get("sort") ? "created" : "pushed";
        const direction = searchParams.get("direction") === "desc" || !searchParams.get("direction") ? "desc" : "asc";

        const data = await fetchRepos(user, nextPage, sort, direction);

        if ("error" in data) return setLoading(false);

        if (data.last) setLoading(false); // Avoid unecessary API calls
        else setPage(page + 1);

        if ("repos" in data) setRepos([...repos, ...data.repos]);
    };

    return (
        <>
            <RepoList repos={repos} />
            {loading && (
                <div className="font-bold my-5 text-center" ref={ref}>
                    Loading...
                </div>
            )}
        </>
    );
};

export default LoadMore;
