import fetchRepoCommits from "@/actions/fetchRepoCommits";
import CommitsHeatMap from "@/components/CommitsHeatMap";
import Link from "next/link";

export default async function RepoPage({ params: { user, repo } }) {
    const data = await fetchRepoCommits(user, repo);

    if (data.error) return <div>{data.error}</div>;

    const { commits } = data;

    return (
        <div>
            <Link href={`/${user}`}>Back</Link>
            <p>{repo}</p>
            <CommitsHeatMap commits={commits} />
        </div>
    );
}
