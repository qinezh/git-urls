interface GitInfo {
    repoName: string,
    branchName: string,
    userName: string,
    relativefilePath?: string,
    startLine?: number,
    endLine?: number,
    isHttp?: boolean,
    metadata?: object
}

export default GitInfo;