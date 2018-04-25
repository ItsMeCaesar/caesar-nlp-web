export class Response {

    ok: boolean;
    msg: string;
    list: Array<any>;

    /**
     * Constructor
     *
     * @param ok
     */
    constructor(ok: boolean) {
        this.ok = ok;
    }


     /**
     * Print info
     */
    toString(): string {
        return '{ \n'
            + '\"ok\": \"' + this.ok + '\",\n'
            + '\"msg\": \"' + this.msg + '\"\n'
            + '\"list\": \"' + this.list + '\"\n'
            + '}';
    }
}
