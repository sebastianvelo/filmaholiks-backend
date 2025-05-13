import CardVerticalModel from "@shared/model/components/CardVerticalModel";

const getResults = <T>(items: T[], mapper: (i: T) => CardVerticalModel, query: string) => ({
    id: "results",
    title: `Results of "${query}"`,
    cards: items.map(mapper),
    isGrid: true
});

export default getResults;