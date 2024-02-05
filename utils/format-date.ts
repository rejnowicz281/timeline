// format dates from format 2023-12-26T16:35:28Z to 26 December 2023
export function formatDate(date: string) {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
}
