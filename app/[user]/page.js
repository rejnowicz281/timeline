import fetchRepos from "@/actions/fetchRepos";
import Repos from "@/components/Repos";
import Image from "next/image";
import Link from "next/link";

export default async function UserPage({ params: { user } }) {
    const data = await fetchRepos(user, 1);

    if (data.error) return <div>{data.error}</div>;

    const { repos } = data;

    return (
        <div>
            <Link href="/">Back</Link>
            <div>{repos[0].owner.login}</div>
            <Image src={repos[0].owner.avatar_url} width={300} height={300} alt="User Avatar" />
            <hr />
            <Repos repos={repos} user={user} />
        </div>
    );
}
