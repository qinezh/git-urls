import Host from './host';
import GitInfo from '../gitInfo'
import ConfigInfo from "../configInfo";

export default class Vsts implements Host {
    private static urlRegex: RegExp = /https:\/\/\w+\.visualstudio\.com\/[/\w]+\/_git\/[^/]+/i;

    public static match(url: string): boolean {
        return Vsts.urlRegex.test(url);
    }

    public parse(info: ConfigInfo): GitInfo {
        return {
            repoName: info.remoteUrl,
            branchName: info.branchName,
            userName: '',
            relativefilePath: undefined,
            startLine: undefined,
            endLine: undefined,
            isHttp: true,
        }
    }

    public assemble(info: GitInfo): string {
        const path: string = encodeURIComponent(`/${info.relativefilePath}`);
        let url =  `${info.repoName}?path=${path}&version=GB${info.branchName}&_a=contents`;

        if (info.startLine) {
            url += `&lineStyle=plain&line=${info.startLine}&lineEnd=${info.endLine}`;
        }

        return url;
    }
}
