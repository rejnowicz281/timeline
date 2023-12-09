import Repo from "../Repo";

export default function RepoList({ repos }) {
    return repos.map((repo) => <Repo repo={repo} key={repo.id} />);
}
