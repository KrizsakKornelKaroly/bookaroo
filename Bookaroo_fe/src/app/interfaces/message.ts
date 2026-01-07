export interface Message {
    severity : 'info' | 'warning' | 'danger' | 'success';
    title: string;
    message: string;
    timestamp: Date;
    icon?: string;
}