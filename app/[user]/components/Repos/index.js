import css from "./index.module.css";

export default function Repos({ repos }) {
    return (
        <div className={css.container}>
            {repos.map((repo) => (
                <div className={css.repo} key={repo.id}>
                    <div className={css["repo-flag"]}></div>
                    <div className={css["repo-content"]}>
                        <a href={repo.html_url}>{repo.name}</a>
                        {repo.created_at && <p>Created at: {repo.created_at}</p>}
                        {repo.language && <span> ({repo.language})</span>}
                        {repo.homepage && <span> ({repo.homepage})</span>}
                        {repo.description && <p>{repo.description}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}
