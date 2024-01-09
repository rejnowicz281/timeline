import fetchRepos from "@/actions/fetchRepos";
import Input from "@/components/Input";
import Repos from "@/components/Repos";
import Image from "next/image";
import css from "./page.module.css";

export default async function UserPage({ params: { user } }) {
    const reposData = await fetchRepos(user, 1);

    if (reposData.error)
        return (
            <div class={css["error-wrapper"]}>
                <div>
                    <h1 className={css["error-header"]}>No user found. Try again for...</h1>
                    <Input />
                </div>
            </div>
        );

    const { repos } = reposData;

    return (
        <>
            <div className={css["input-wrapper"]}>
                <Input />
            </div>
            <h1 className={css.header}>
                <a href={`https://www.github.com/${user}`}>{user}</a>
            </h1>
            <div className={css["avatar-wrapper"]}>
                <a href={`https://www.github.com/${user}`}>
                    <Image src={repos[0].owner.avatar_url} width={300} height={300} alt="User Avatar" />
                </a>
            </div>
            <div className={css["repos-wrapper"]}>
                <Repos repos={repos} user={user} />
            </div>
        </>
    );
}
