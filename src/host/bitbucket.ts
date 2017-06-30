import Host from "./host";
import GitHub from "./github";
import GitInfo from "../gitInfo";
import ConfigInfo from "../configInfo";

class BitBucket extends GitHub {
    hostname = "bitbucket.org";
    separateFolder = "src";

}

export default BitBucket;