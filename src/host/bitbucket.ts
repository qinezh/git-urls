import DefaultHost from "./defaultHost";

export default class BitBucket extends DefaultHost {
    protected hostname = "bitbucket.org";
    protected separateFolder = "src";
}