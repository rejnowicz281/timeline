"use client";

import formatCommits from "@/lib/formatCommits";
import HeatMap from "@uiw/react-heat-map";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

export default function CommitsHeatMap({ commits }) {
    const value = formatCommits(commits);
    const [year, setYear] = useState(Object.keys(value)[0]);
    const [selected, setSelected] = useState("");

    return (
        <>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
                {Object.keys(value).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <HeatMap
                value={value[year]}
                weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
                monthLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                startDate={new Date(`${year}/01/01`)}
                endDate={new Date(`${year}/12/31`)}
                fontFamily="Arial"
                rectSize={16}
                width={999}
                legendCellSize={0}
                rectRender={(props, data) => {
                    if (selected !== "") props.opacity = data.date === selected.date ? 1 : 0.45;

                    return (
                        <rect
                            onClick={() => setSelected(data.date == selected ? "" : data)}
                            className="cell-tooltip"
                            data-tooltip-content={
                                data.count ? `${data.count} commit(s) on ${data.date}` : `No commits on ${data.date}`
                            }
                            {...props}
                        />
                    );
                }}
            />
            <Tooltip anchorSelect=".cell-tooltip" place="bottom" />
            {selected !== "" &&
                (selected.count > 0 ? (
                    <div>
                        <p>
                            {selected.count} commit(s) on {selected.date}
                        </p>
                        <ul>
                            {selected.details.map((commit, idx) => (
                                <li key={idx}>
                                    <p>{commit.message}</p>
                                    <p>{commit.committer.name}</p>
                                    <p>{commit.committer.email}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>
                        <p>No commits on {selected.date}</p>
                    </div>
                ))}
        </>
    );
}
