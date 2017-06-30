import Host from "./host";
import GitInfo from "../gitInfo";
import ConfigInfo from "../configInfo";
import GitHub from "./github";

class GitLab extends GitHub {
    hostname = "gitlab.com";
}

export default GitLab;