export default function formatCommits(commits) {
    const formattedCommits = {};

    commits.forEach((commit) => {
        const date = new Date(commit.commit.committer.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}/${month}/${day}`;

        if (!formattedCommits[year]) formattedCommits[year] = []; // if year doesn't exist, create it

        const yearCommits = formattedCommits[year];
        const existingDate = yearCommits.find((c) => c.date === formattedDate);

        if (existingDate) {
            // if date exists, increment count and add details
            existingDate.count++;
            existingDate.details.push({
                html_url: commit.html_url,
                message: commit.commit.message,
                committer: {
                    name: commit.commit.committer.name,
                    email: commit.commit.committer.email,
                },
            });
        } else {
            // if date doesn't exist, create it
            yearCommits.push({
                date: formattedDate,
                count: 1,
                details: [
                    {
                        html_url: commit.html_url,
                        message: commit.commit.message,
                        committer: {
                            name: commit.commit.committer.name,
                            email: commit.commit.committer.email,
                        },
                    },
                ],
            });
        }
    });

    return formattedCommits;
}
