import TimelineHeader from "@/components/pages/timeline/header";
import Repos from "@/components/pages/timeline/repos";
import { ReposData } from "@/lib/types/repos";
import fetchRepos from "@/lib/utils/github";
import { useLoadingBar } from "@/providers/loading-bar-provider";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation, useParams } from "react-router-dom";

export type SortType = "created" | "pushed";
export type DirectionType = "asc" | "desc";

export default function TimelinePage() {
    const [page, setPage] = useState<number>(1);

    const { username } = useParams();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const paramsSort = searchParams.get("sort");
    const paramsDirection = searchParams.get("direction");

    const sort: SortType = paramsSort === "created" || !paramsSort ? "created" : "pushed";
    const direction: DirectionType = paramsDirection === "desc" || !paramsDirection ? "desc" : "asc";

    const [initialLoading, setInitialLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(true);

    const [repos, setRepos] = useState<ReposData>([]);
    const [error, setError] = useState<null | string>(null);

    const { setProgress } = useLoadingBar();

    const loadRepos = async (reset = false) => {
        const fetchResult = await fetchRepos(reset ? 1 : page, username, sort, direction);

        if ("error" in fetchResult) setError(fetchResult.error);
        else if (fetchResult.last) setLoadMore(false);
        else setPage(reset ? 2 : (prevPage) => prevPage + 1);

        if ("repos" in fetchResult) {
            if (reset) {
                setError(null);
                setRepos(fetchResult.repos);
            } else setRepos((prevRepos) => [...prevRepos, ...fetchResult.repos]);
        }
    };

    const { ref, inView } = useInView();

    useEffect(() => {
        setProgress(30);

        loadRepos(true)
            .then(() => setInitialLoading(false))
            .finally(() => setProgress(100));
    }, [username, search]);

    useEffect(() => {
        if (inView && loadMore) loadRepos();
    }, [inView]);

    if (initialLoading)
        return (
            <div className="text-center text-sm text-gray-500">
                Fetching user <i>{username}</i>...
            </div>
        );

    if (!username || error)
        return (
            <div className="text-center text-sm text-gray-500">
                Couldn't find user <i>{username}</i>. {error && `Error: ${error}`}
            </div>
        );

    if (!repos.length)
        return (
            <div className="text-center text-sm text-gray-500">
                No repositories found for user <i>{username}</i>.
            </div>
        );

    return (
        <>
            <TimelineHeader
                avatarUrl={repos[0].owner.avatar_url}
                username={username}
                sort={sort}
                direction={direction}
            />
            <Repos repos={repos} />
            {loadMore && (
                <div className="font-bold my-5 text-center" ref={ref}>
                    Loading...
                </div>
            )}
        </>
    );
}
