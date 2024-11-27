import { Button } from "@/components/ui/button";
import { DirectionType, SortType } from "@/pages/timeline";
import { CalendarFold, ChevronDown, ChevronUp, PencilLine } from "lucide-react";
import { Link } from "react-router-dom";

export default function TimelineHeader({
    username,
    avatarUrl,
    sort,
    direction
}: {
    username: string;
    avatarUrl: string;
    sort: SortType;
    direction: DirectionType;
}) {
    return (
        <>
            <div className="text-center">
                <Button asChild variant="link" className="text-5xl dark:text-stone-300">
                    <a href={`https://www.github.com/${username}`}>{username}</a>
                </Button>
            </div>
            <div className="mt-6 mb-12 flex justify-center items-center">
                <a href={`https://www.github.com/${username}`}>
                    <img
                        className="rounded-[50%] hover:opacity-80 transition-opacity"
                        src={avatarUrl}
                        width={300}
                        height={300}
                        alt="User Avatar"
                    />
                </a>
            </div>
            <div className="flex flex-row justify-center mb-10">
                {sort === "pushed" && (
                    <Button variant="ghost" asChild>
                        <Link to={`?sort=created&direction=${direction}`} className="flex items-center gap-1">
                            <CalendarFold size={20} />
                            Sort by Creation Date
                        </Link>
                    </Button>
                )}
                {sort === "created" && (
                    <Button variant="ghost" asChild>
                        <Link to={`?sort=pushed&direction=${direction}`} className="flex items-center gap-1">
                            <PencilLine size={20} />
                            Sort by Last Update
                        </Link>
                    </Button>
                )}
                {direction === "asc" && (
                    <Button asChild variant="ghost" size="icon">
                        <Link to={`?sort=${sort}&direction=desc`} className="flex items-center gap-1">
                            <ChevronUp size={20} />
                        </Link>
                    </Button>
                )}
                {direction === "desc" && (
                    <Button asChild variant="ghost" size="icon">
                        <Link to={`?sort=${sort}&direction=asc`} className="flex items-center gap-1">
                            <ChevronDown size={20} />
                        </Link>
                    </Button>
                )}
            </div>
        </>
    );
}
