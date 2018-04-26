import { Intent } from './intent';
import { IntentEntitySynonym } from './intententitysynonym';

export class Domain {

    id: string;
    name: string;
    locale: string;
    intents: Array<Intent>;
    entitySynonyms: Array<IntentEntitySynonym>;

    /**
     * Constructor
     *
     * @param id
     * @param name
     * @param locale
     * @param intents
     * @param entitySynonyms
     */
    constructor(
        id: string,
        name: string,
        locale: string,
        intents: Array<Intent>,
        entitySynonyms: Array<IntentEntitySynonym>
    ) {
        this.id = id;
        this.name = name;
        this.locale = locale;
        this.intents = intents;
        this.entitySynonyms = entitySynonyms;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"id\": \"' + this.id + '\",\n'
            + '\"name\": \"' + this.name + '\",\n'
            + '\"locale\": \"' + this.locale + '\",\n'
            + '\"intents\": \"' + this.intents + '\",\n'
            + '\"entitySynonyms\": \"' + this.entitySynonyms + '\"\n'
            + '}';
    }

}
