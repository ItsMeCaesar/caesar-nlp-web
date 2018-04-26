export class Entity {

    id: string;
    locale: string;
    value: string;
    type: string;

    /**
     * Constructor
     *
     * @param id
     * @param locale
     * @param value
     * @param type
     */
    constructor(
        id: string,
        locale: string,
        value: string,
        type: string
    ) {
        this.id = id;
        this.locale = locale;
        this.value = value;
        this.type = type;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"id\": \"' + this.id + '\",\n'
            + '\"locale\": \"' + this.locale + '\",\n'
            + '\"value\": \"' + this.value + '\",\n'
            + '\"type\": \"' + this.type + '\"\n'
            + '}';
    }

}
