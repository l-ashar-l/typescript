class UrlService {
    private dataStore: Map<string, string>
    constructor() {
        this.dataStore = new Map();
    }

    public encoder(url: string): string {
        return '';
    }

    public getEncodedUrl(url: string) {}
};

export default UrlService;