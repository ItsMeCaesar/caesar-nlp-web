export class EntityType {

    id: string;
    name: string;

    /**
     * Constructor
     *
     * @param id
     */
    constructor(
        id: string,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }


    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"id\": \"' + this.id + '\",\n'
            + '\"name\": \"' + this.name + '\"\n'
            + '}';
    }

}
