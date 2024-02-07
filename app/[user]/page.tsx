import fetchRepos from "@/actions/fetch-repos";
import { default as InputBox } from "@/components/input-box";
import Repos from "@/components/repos";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

export type UserPageProps = {
    params: { user: string };
};

const UserPage: FC<UserPageProps> = async ({ params: { user } }) => {
    const reposData = await fetchRepos(user, 1);

    if (reposData.error)
        return (
            <div className="flex-1 flex flex-col gap-4 items-center justify-center p-4">
                <h1 className="text-2xl">No user found. Try again...</h1>
                <InputBox />
            </div>
        );

    const repos = "repos" in reposData ? reposData.repos : [];

    return (
        <>
            <div className="flex justify-center items-center my-8">
                <InputBox />
            </div>
            <div className="text-center">
                <Button asChild variant="link" className="text-5xl text-stone-300">
                    <a href={`https://www.github.com/${user}`}>{user}</a>
                </Button>
            </div>
            <div className="mt-6 mb-12 flex justify-center items-center">
                <a href={`https://www.github.com/${user}`}>
                    <Image
                        className="rounded-[50%] hover:opacity-80 transition-opacity"
                        src={repos[0].owner.avatar_url}
                        width={300}
                        height={300}
                        alt="User Avatar"
                    />
                </a>
            </div>

            <Repos repos={repos} user={user} />
        </>
    );
};

export default UserPage;
