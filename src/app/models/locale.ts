
export class Locale {

    code: string;
    description: string;


    /**
     * Constructor
     *
     * @param code
     * @param description
     */
    constructor(
        code: string,
        description: string
    ) {
        this.code = code;
        this.description = description;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"code\": \"' + this.code + '\",\n'
            + '\"description\": \"' + this.description + '\"\n'
            + '}';
    }

}
