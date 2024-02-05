import fetchRepos from "@/actions/fetch-repos";
import Input from "@/components/input";
import Repos from "@/components/repos";
import Image from "next/image";
import { FC } from "react";
import css from "./page.module.css";

export type UserPageProps = {
    params: { user: string };
};

const UserPage: FC<UserPageProps> = async ({ params: { user } }) => {
    const reposData = await fetchRepos(user, 1);

    if (reposData.error)
        return (
            <div className={css["error-wrapper"]}>
                <div>
                    <h1 className={css["error-header"]}>No user found. Try again for...</h1>
                    <Input />
                </div>
            </div>
        );

    const repos = "repos" in reposData ? reposData.repos : [];

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
};

export default UserPage;
