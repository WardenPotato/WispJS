import { Manager, Socket } from "socket.io-client";
interface ConsoleMessage {
    type: string;
    line: string;
}
interface GitCloneData {
    dir: string;
    url: string;
    branch: string;
    authkey?: string | undefined;
}
export interface GitCloneResult {
    isPrivate: boolean;
}
interface GitPullData {
    dir: string;
    authkey?: string;
}
export interface GitPullResult {
    output: string | undefined;
    isPrivate: boolean;
}
interface FilesearchFile {
    results: number;
    lines: {
        [key: string]: string;
    };
}
export interface FilesearchResults {
    files: {
        [key: string]: FilesearchFile;
    };
    tooMany: boolean;
}
interface ServerToClientEvents {
    "error": (message: string) => void;
    "auth_success": (message: string) => void;
    "filesearch-results": (data: FilesearchResults) => void;
    "git-error": (data: string) => void;
    "git-success": (message?: string) => void;
    "git-clone": (data: GitCloneData) => void;
    "git-pull": (data: GitPullData) => void;
    "console": (message: ConsoleMessage) => void;
}
interface ClientToServerEvents {
    "auth": (token: string) => void;
    "filesearch-start": (query: string) => void;
    "git-clone": (data: GitCloneData) => void;
    "git-pull": (data: GitPullData) => void;
}
export interface WispSocket {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    logger: any;
    url: string;
    token: string;
    ghToken: string;
    manager: Manager;
}
export declare class WispSocket {
    constructor(logger: any, url: string, token: string, ghToken: string);
    connect(): Promise<void>;
    filesearch(query: string): Promise<FilesearchResults>;
    gitPull(dir: string): Promise<GitPullResult | undefined>;
    gitClone(url: string, dir: string, branch: string): Promise<GitCloneResult | undefined>;
    addConsoleListener(callback: (message: string) => void): void;
}
export {};
