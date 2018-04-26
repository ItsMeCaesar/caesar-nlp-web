import { Entity } from './entity';

export class Intent {

    text: string;
    intent: string;
    entities: Array<Entity>;

    /**
     * Constructor
     *
     * @param text
     * @param intent
     * @param entities
     */
    constructor(
        text: string,
        intent: string,
        entities: Array<Entity>
    ) {
        this.text = text;
        this.intent = intent;
        this.entities = entities;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"text\": \"' + this.text + '\",\n'
            + '\"intent\": \"' + this.intent + '\",\n'
            + '\"entities\": \"' + this.entities + '\"\n'
            + '}';
    }

}
