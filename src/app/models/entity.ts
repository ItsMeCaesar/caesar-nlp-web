export class Entity {

    id: string;

    /**
     * Constructor
     *
     * @param id
     */
    constructor(
        id: string
    ) {
        this.id = id;
    }


    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"id\": \"' + this.id + '\",\n'
            + '}';
    }

}
