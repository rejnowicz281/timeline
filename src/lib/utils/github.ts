import { ReposData, ReposResult } from "@/lib/types/repos";

export type FetchReposResult = ReposResult | { error: string };

export default async function fetchRepos(
    page: number,
    username?: string,
    sort: undefined | "pushed" | "created" = "created",
    direction: undefined | "asc" | "desc" = "desc"
): Promise<FetchReposResult> {
    try {
        if (!username) return { error: "No username provided." };

        const per_page = 5;

        const url = `https://api.github.com/users/${username}/repos?sort=${sort}&direction=${direction}&page=${page}&per_page=${per_page}&type=owner`;

        const res = await fetch(url);

        if (res.status === 404) return { error: "User not found." };

        const data: ReposData = await res.json();
        if (!data.length) return { error: "No repos found." };

        // Let the component know that there are no more repos to load to avoid unecessary API calls
        const result: ReposResult = (() => {
            if (data.length === per_page) return { repos: data, last: false };
            return { repos: data, last: true };
        })();

        return result;
    } catch (err: any) {
        return { error: err.message };
    }
}
