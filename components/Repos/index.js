import LoadMore from "./LoadMore";
import RepoList from "./RepoList";
import css from "./index.module.css";

// First, show the server-side rendered repos, then show the on-scroll client-side rendered repos

export default function Repos({ repos, user }) {
    return (
        <div className={css.container}>
            <RepoList repos={repos} />
            <LoadMore user={user} />
        </div>
    );
}
