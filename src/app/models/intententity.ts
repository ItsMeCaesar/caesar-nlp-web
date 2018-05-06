export class IntentEntity {

    start: number;
    end: number;
    value: string;
    type: string;

    /**
     * Constructor
     *
     * @param start
     * @param end
     * @param value
     * @param type
     */
    constructor(
        start: number,
        end: number,
        value: string,
        type: string
    ) {
        this.start = start;
        this.end = end;
        this.value = value;
        this.type = type;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"start\": \"' + this.start + '\",\n'
            + '\"end\": \"' + this.end + '\",\n'
            + '\"value\": \"' + this.value + '\",\n'
            + '\"type\": \"' + this.type + '\"\n'
            + '}';
    }

}

