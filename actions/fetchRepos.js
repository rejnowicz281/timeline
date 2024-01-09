export default async function fetchRepos(user, page) {
    const per_page = 24;
    const sort = "created";
    const direction = "desc";

    const url = `https://api.github.com/users/${user}/repos?sort=${sort}&direction=${direction}&page=${page}&per_page=${per_page}&type=owner`;

    try {
        const res = await fetch(url);

        if (res.status === 404) return { error: "User not found." };

        const data = await res.json();

        if (!data.length) return { error: "No repos found." };

        const result = { repos: data };

        // Let the component know that there are no more repos to load to avoid unecessary API calls
        if (data.length < per_page) result.last = true;

        return result;
    } catch (err) {
        return { error: err.message };
    }
}
