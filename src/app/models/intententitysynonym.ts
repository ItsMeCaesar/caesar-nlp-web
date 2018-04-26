export class IntentEntitySynonym {

    value: string;
    synonyms: Array<string>;

    /**
     * Constructor
     *
     * @param value
     * @param synonyms
     */
    constructor(
        value: string,
        synonyms: Array<string>
    ) {
        this.value = value;
        this.synonyms = synonyms;
        this.value = value;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"value\": \"' + this.value + '\",\n'
            + '\"synonyms\": \"' + this.synonyms + '\"\n'
            + '}';
    }

}
