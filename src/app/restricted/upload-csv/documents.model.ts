import { Subscription } from "rxjs";

export interface Documents {
    documentUpload?: string;
    data: File;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    sub?: Subscription;
}