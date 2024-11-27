import { Endpoints } from "@octokit/types";

export type ReposData = Endpoints[`GET /users/{username}/repos`]["response"]["data"];
