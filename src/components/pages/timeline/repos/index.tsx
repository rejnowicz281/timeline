import { ReposData } from "@/lib/types/repos";
import Repo from "./repo";

export default function Repos({ repos }: { repos: ReposData }) {
    return (
        <div className="overflow-hidden flex flex-col text-xl border-t-2 border-t-gray-500">
            {repos.map((repo) => (
                <Repo repo={repo} key={repo.id} />
            ))}
        </div>
    );
}
