import fetchRepos from "@/actions/fetch-repos";
import { default as InputBox } from "@/components/general/input-box";
import Repos from "@/components/repos";
import { Button } from "@/components/ui/button";
import { CiEdit } from "@react-icons/all-files/ci/CiEdit";
import { IoCreateOutline } from "@react-icons/all-files/io5/IoCreateOutline";
import { MdKeyboardArrowDown } from "@react-icons/all-files/md/MdKeyboardArrowDown";
import { MdKeyboardArrowUp } from "@react-icons/all-files/md/MdKeyboardArrowUp";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export type UserPageProps = {
    params: { user: string };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

const UserPage: FC<UserPageProps> = async ({ params: { user }, searchParams }) => {
    const sort = searchParams.sort === "created" || !searchParams.sort ? "created" : "pushed";
    const direction = searchParams.direction === "desc" || !searchParams.direction ? "desc" : "asc";

    const data = await fetchRepos(user, 1, sort, direction);

    if ("error" in data)
        return (
            <div className="flex-1 flex flex-col gap-4 items-center justify-center p-4">
                <h1 className="text-2xl">No user found. Try again...</h1>
                <InputBox />
            </div>
        );

    const { repos, last } = data;

    return (
        <>
            <div className="flex justify-center items-center my-8">
                <InputBox />
            </div>
            <div className="text-center">
                <Button asChild variant="link" className="text-5xl dark:text-stone-300">
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
            <div className="flex flex-row justify-center mb-10">
                {sort === "pushed" && (
                    <Button variant="ghost" asChild>
                        <Link href={`?sort=created&direction=${direction}`} className="flex items-center gap-1">
                            <IoCreateOutline className="text-2xl" />
                            Sort by Creation Date
                        </Link>
                    </Button>
                )}
                {sort === "created" && (
                    <Button variant="ghost" asChild>
                        <Link href={`?sort=pushed&direction=${direction}`} className="flex items-center gap-1">
                            <CiEdit className="text-2xl" />
                            Sort by Last Update
                        </Link>
                    </Button>
                )}
                {direction === "asc" && (
                    <Button asChild variant="ghost" size="icon">
                        <Link href={`?sort=${sort}&direction=desc`} className="flex items-center gap-1">
                            <MdKeyboardArrowUp className="text-2xl" />
                        </Link>
                    </Button>
                )}
                {direction === "desc" && (
                    <Button asChild variant="ghost" size="icon">
                        <Link href={`?sort=${sort}&direction=asc`} className="flex items-center gap-1">
                            <MdKeyboardArrowDown className="text-2xl" />
                        </Link>
                    </Button>
                )}
            </div>
            <Repos repos={repos} user={user} last={last} />
        </>
    );
};

export default UserPage;
