import { IntentSectionView } from './intentsectionview';

export class IntentView {

    index: number;
    sections: Array<IntentSectionView>;

    /**
     * Constructor
     *
     * @param index
     * @param sections
     */
    constructor(
        index: number,
        sections: Array<IntentSectionView>
    ) {
        this.index = index;
        this.sections = sections;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"index\": \"' + this.index + '\",\n'
            + '\"sections\": \"' + this.sections + '\"\n'
            + '}';
    }

}
