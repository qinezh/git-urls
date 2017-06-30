import BasicHost from "./defaultHost";

export default class GitHub extends BasicHost {
    protected hostname = "github.com";
    protected separateFolder = "blob";
}