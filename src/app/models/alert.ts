export class Alert {

    show: boolean;
    type: string;
    msg: string;

    /**
     * Constructor
     *
     * @param show
     * @param type
     * @param msg
     */
    constructor(
        show: boolean,
        type: string,
        msg: string
    ) {
        this.show = show;
        this.type = type;
        this.msg = msg;
    }

    /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"show\": \"' + this.show + '\",\n'
            + '\"type\": \"' + this.type + '\",\n'
            + '\"msg\": \"' + this.msg + '\"\n'
            + '}';
    }

}
