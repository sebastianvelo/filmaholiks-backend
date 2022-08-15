import { CardVerticalProps } from "../../model/card-vertical/CardVerticalProps";

const getResults = <T>(items: T[], mapper: (i: T) => CardVerticalProps, query: string) => ({
    id: "results",
    title: `Results of "${query}"`,
    cards: items.map(mapper),
    isGrid: true
});

export default getResults;