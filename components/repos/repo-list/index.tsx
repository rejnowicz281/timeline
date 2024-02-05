import { ReposData } from "@/types/repos";
import { FC } from "react";
import Repo from "../repo";

export type RepoListProps = {
    repos: ReposData;
};

const RepoList: FC<RepoListProps> = ({ repos }) => {
    return repos.map((repo) => <Repo repo={repo} key={repo.id} />);
};

export default RepoList;
