import { ReposData } from "@/types/repos";
import { FC } from "react";
import css from "./index.module.css";
import LoadMore from "./load-more";
import RepoList from "./repo-list";

export type ReposProps = {
    repos: ReposData;
    user: string;
};

// First, show the server-side rendered repos, then show the on-scroll client-side rendered repos

const Repos: FC<ReposProps> = ({ repos, user }) => {
    return (
        <div className={css.container}>
            <RepoList repos={repos} />
            <LoadMore user={user} />
        </div>
    );
};

export default Repos;
