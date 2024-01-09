import { formatDate } from "@/utils/formatDate";
import css from "../index.module.css";

export default function Repo({ repo }) {
    return (
        <div className={css.repo}>
            <a href={repo.html_url} className={css["repo-flag"]}></a>
            <a href={repo.html_url} className={css["repo-content"]}>
                {repo.created_at && <div className={css["repo-date"]}>{formatDate(repo.created_at)}</div>}
                <div className={css["repo-name"]}>{repo.name}</div>
                {repo.language && <div className={css["repo-language"]}> {repo.language}</div>}
            </a>
        </div>
    );
}
