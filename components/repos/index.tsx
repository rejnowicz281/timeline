import { ReposData } from "@/types/repos";
import { FC } from "react";
import LoadMore from "./load-more";
import RepoList from "./repo-list";

export type ReposProps = {
    repos: ReposData;
    user: string;
    last: boolean;
};

// First, show the server-side rendered repos, then show the on-scroll client-side rendered repos

const Repos: FC<ReposProps> = ({ repos, user, last }) => {
    return (
        <div className="overflow-hidden flex flex-col text-xl border-t-2 border-t-gray-500">
            <RepoList repos={repos} />
            {!last && <LoadMore user={user} />}
        </div>
    );
};

export default Repos;
