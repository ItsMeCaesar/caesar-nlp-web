export class EntityView {

    type: string;
    color: string;

    /**
     * Constructor
     *
     * @param type
     * @param color
     */
    constructor(
        type: string,
        color: string
    ) {
        this.type = type;
        this.color = color;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"type\": \"' + this.type + '\",\n'
            + '\"color\": \"' + this.color + '\"\n'
            + '}';
    }

}
