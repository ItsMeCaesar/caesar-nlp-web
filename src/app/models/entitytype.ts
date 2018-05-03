export class EntityType {

    id: string;
    name: string;
    color: string;

    /**
     * Constructor
     *
     * @param id
     * @param name
     * @param color
     */
    constructor(
        id: string,
        name: string,
        color: string
    ) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"id\": \"' + this.id + '\",\n'
            + '\"name\": \"' + this.name + '\",\n'
            + '\"color\": \"' + this.color + '\"\n'
            + '}';
    }

}
