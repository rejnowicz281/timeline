import TimelineHeader from "@/components/pages/timeline/header";
import Repos from "@/components/pages/timeline/repos";
import { useInfiniteQuery } from "@tanstack/react-query";

import { REPOS_PER_PAGE } from "@/lib/config";
import { ReposData } from "@/lib/types/repos";
import { useLoadingBar } from "@/providers/loading-bar-provider";
import { CircleDashed } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation, useParams } from "react-router-dom";
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

    const finishProgressAndReturnError = (message: string) => {
        setProgress(100);
        return new Error(message);
    };

    const query = useInfiniteQuery({
        queryKey: ["timeline", username, sort, direction],
        initialPageParam: 1,
        retry: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        queryFn: async ({ pageParam }) => {
            setProgress(30);

            if (!username) throw finishProgressAndReturnError("No username provided.");

            const url = `https://api.github.com/users/${username}/repos?sort=${sort}&direction=${direction}&page=${pageParam}&per_page=${REPOS_PER_PAGE}&type=owner`;

            const res = await fetch(url);

            if (res.status === 404) throw finishProgressAndReturnError("User not found.");

            const data: ReposData = await res.json();

            if ("message" in data || !data.length)
                throw finishProgressAndReturnError("User has no public repositories.");

            console.log("Fetch Repos Success - Fetched", data.length, "Repos");

            setProgress(100);

            return data;
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            return lastPage.length === REPOS_PER_PAGE ? lastPageParam + 1 : undefined;
        }
    });

    useEffect(() => {
        if (inView && query.hasNextPage && !query.isLoading && !query.isFetching && !query.isFetchingNextPage)
            query.fetchNextPage();
    }, [inView]);

    // This should never happen
    if (!username) return <HomePage />;

    if (query.isError || query.error)
        return (
            <div className="text-center text-sm text-gray-500">
                An error has occured while fetching the data: {query.error.message}
            </div>
        );

    const repos = query.data?.pages.flat();

    return (
        <>
            <TimelineHeader
                loading={query.isLoading}
                avatarUrl={repos && repos[0].owner.avatar_url}
                username={username}
                sort={sort}
                direction={direction}
            />
            {repos && <Repos repos={repos} />}
            {query.hasNextPage && (
                <div ref={ref} className="font-bold flex justify-center gap-4 items-center my-5 text-center">
                    Loading repositories... <CircleDashed size={20} className="animate-spin" />
                </div>
            )}
        </>
    );
}
