import { ReposData, ReposResult } from "@/types/repos";

export default async function fetchRepos(
    user: string,
    page: number,
    sort: undefined | "pushed" | "created" = "created",
    direction: undefined | "asc" | "desc" = "desc"
): Promise<ReposResult | { error: string }> {
    const per_page = 24;

    const url = `https://api.github.com/users/${user}/repos?sort=${sort}&direction=${direction}&page=${page}&per_page=${per_page}&type=owner`;

    try {
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
