import css from "../index.module.css";

export default function Repo({ repo }) {
    return (
        <div className={css.repo}>
            <a href={repo.html_url} className={css["repo-flag"]}></a>
            <div className={css["repo-content"]}>
                <a href={repo.html_url}>{repo.name}</a>
                {repo.created_at && <p>Created at: {repo.created_at}</p>}
                {repo.language && <span> ({repo.language})</span>}
                {repo.homepage && <span> ({repo.homepage})</span>}
                {repo.description && <p>{repo.description}</p>}
            </div>
        </div>
    );
}
