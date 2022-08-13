import { CardProps } from "../../model/card/CardProps";

class ResultsHelper {

    public static getResults = <T>(items: T[], mapper: (i: T) => CardProps, query: string) => ({
        id: "results",
        title: `Results of "${query}"`,
        cards: items.map(mapper),
        isGrid: true
    });
}

export default ResultsHelper;