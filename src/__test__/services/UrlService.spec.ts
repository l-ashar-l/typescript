import { UrlService } from "../../services";

describe("Url Service Module Test cases", () => {
    let urlService: UrlService;
    beforeAll(() => {
        urlService = new UrlService();
    });

    it("Checks that URL service is defined", () => {
        expect(urlService).toBeDefined();
        expect(urlService.encoder).toBeInstanceOf(Function);
    });

    it("Tests encoder function", () => {
        const url = "www.test.com";
        const encodedUrl = urlService.encoder(url);
        expect(encodedUrl).toBeTruthy();
    });
});