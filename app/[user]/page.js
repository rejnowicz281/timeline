import Image from "next/image";
import Link from "next/link";

export default async function UserPage({ params: { user } }) {
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=1000`);
    const data = await res.json();

    if (res.status === 404) return <div>User not found.</div>;
    else if (!data.length) return <div>No repos found.</div>;

    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <div>
            <Link href="/">Back</Link>
            <div>{data[0].owner.login}</div>
            <Image src={data[0].owner.avatar_url} width={300} height={300} alt="User Avatar" />
            <hr />
            <ul>
                {data.map((repo) => (
                    <li key={repo.id}>
                        <a href={repo.html_url}>{repo.name}</a>
                        {repo.created_at && <p>Created at: {repo.created_at}</p>}
                        {repo.language && <span> ({repo.language})</span>}
                        {repo.homepage && <span> ({repo.homepage})</span>}
                        {repo.description && <p>{repo.description}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
