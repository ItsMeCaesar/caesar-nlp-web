import { IntentSectionView } from './intentsectionview';

export class IntentView {

    sections: Array<IntentSectionView>;

    /**
     * Constructor
     *
     * @param sections
     */
    constructor(
        sections: Array<IntentSectionView>
    ) {
        this.sections = sections;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"sections\": \"' + this.sections + '\"\n'
            + '}';
    }

}
