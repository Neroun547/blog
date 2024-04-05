export interface ArticlesInterface {
    id?: number;
    name: string;
    theme: string;
    file_name: string;
    date: Date | string;
    likes: number;
    dislikes: number;
}
