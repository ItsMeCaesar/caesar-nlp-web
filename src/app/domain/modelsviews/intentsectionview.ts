import { EntityView } from './entityview';

export class IntentSectionView {

    text: string;
    entities: Array<EntityView>;

    /**
     * Constructor
     *
     * @param text
     * @param entities
     */
    constructor(
        text: string,
        entities: Array<EntityView>
    ) {
        this.text = text;
        this.entities = entities;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"text\": \"' + this.text + '\",\n'
            + '\"entities\": \"' + this.entities + '\"\n'
            + '}';
    }

}
