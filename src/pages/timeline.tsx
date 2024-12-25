import TimelineHeader from "@/components/pages/timeline/header";
import Repos from "@/components/pages/timeline/repos";

import { REPOS_PER_PAGE } from "@/lib/config";
import { ReposData } from "@/lib/types/repos";
import { useLoadingBar } from "@/providers/loading-bar-provider";
import { CircleDashed } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation, useParams } from "react-router-dom";
import useSWRInfinite from "swr/infinite";
import HomePage from "./home";

export type SortType = "created" | "pushed";
export type DirectionType = "asc" | "desc";

export default function TimelinePage() {
    const { username } = useParams();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const paramsSort = searchParams.get("sort");
    const paramsDirection = searchParams.get("direction");

    const sort: SortType = paramsSort === "created" || !paramsSort ? "created" : "pushed";
    const direction: DirectionType = paramsDirection === "desc" || !paramsDirection ? "desc" : "asc";

    const { setProgress } = useLoadingBar();

    const { ref, inView } = useInView();

    const { data, size, setSize, isValidating, isLoading, error } = useSWRInfinite(
        (page) =>
            `https://api.github.com/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=${REPOS_PER_PAGE}&type=owner&page=${
                page + 1
            }`,
        async (url) => {
            const isFirstPage = url.endsWith("1");

            if (isFirstPage) setProgress(30);

            if (!username) throw new Error("No username provided.");

            const res = await fetch(url);

            if (res.status === 404) throw new Error("User not found.");
            if (res.status === 403) throw new Error("API rate limit exceeded.");

            const data: ReposData = await res.json();

            console.log("Fetch Repos Success - Fetched", data.length, "Repos");

            if (isFirstPage) setProgress(100);

            return data;
        },
        {
            initialSize: 1,
            onError: () => {
                setProgress(100);
            },
            revalidateFirstPage: false,
            revalidateOnFocus: true,
            revalidateOnReconnect: false
        }
    );

    const repos = data ? data.flat() : [];
    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = repos.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < REPOS_PER_PAGE);

    useEffect(() => {
        if (inView && !isLoadingMore && !isLoading && !isValidating && !isReachingEnd) setSize(size + 1);
    }, [inView]);

    // This should never happen
    if (!username) return <HomePage />;

    if (error)
        return (
            <div className="text-center text-sm text-gray-500">
                An error has occured while fetching the data: {error.message}
            </div>
        );

    if (repos.length === 0 && !isLoading) {
        return (
            <div className="text-center text-sm text-gray-500">
                No repositories found for <span className="font-bold">{username}</span>.
            </div>
        );
    }

    return (
        <>
            <TimelineHeader
                loading={isLoading}
                avatarUrl={(repos.length > 0 && repos[0].owner.avatar_url) || ""}
                username={username}
                sort={sort}
                direction={direction}
            />
            {repos && <Repos repos={repos} />}
            {!isReachingEnd && (
                <div ref={ref} className="font-bold flex justify-center gap-4 items-center my-5 text-center">
                    Loading repositories... <CircleDashed size={20} className="animate-spin" />
                </div>
            )}
        </>
    );
}
