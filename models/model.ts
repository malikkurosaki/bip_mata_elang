export interface DataKeyword {
    _count: {
        YoutubeContent: number;
        FacebookLike: number;
        GoogleNews: number;
        TwitterLates: number;
    }
}

export interface ResultDashboard {
    id: string;
    idx: number | null;
    name: string | null;
    score: number;
}