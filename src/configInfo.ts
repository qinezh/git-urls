import Section from "./section";

export default class ConfigInfo {
    remoteUrl: string;
    commit: string;
    relativePath?: string;
    section?: Section;

    constructor(remoteUrl: string, commit: string, relativePath?: string, section?: Section) {
        this.remoteUrl = remoteUrl;
        this.commit = commit;
        this.relativePath = relativePath;
        this.section = section;
    }
}
