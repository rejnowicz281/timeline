export default async function fetchRepoCommits(user, repo) {
    const url = `https://api.github.com/repos/${user}/${repo}/commits`;

    try {
        const res = await fetch(url);

        if (res.status === 404) return { error: "Repo not found." };

        const data = await res.json();

        if (!data.length) return { error: "No commits found." };

        const result = { commits: data };

        return result;
    } catch (err) {
        return { error: err.message };
    }
}
