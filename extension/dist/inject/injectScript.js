var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to fetch the source code of the current page
export function fetchCurrentPageSource() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the current URL
            const url = window.location.href;
            // Fetch the page's HTML
            const response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/html',
                }
            });
            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`Failed to fetch the page: ${response.status}`);
            }
            // Get the text of the page (source code)
            const sourceCode = yield response.text();
            // Log the source code to the console
            console.log(sourceCode);
        }
        catch (error) {
            console.error('Error fetching page source:', error);
        }
    });
}
//# sourceMappingURL=injectScript.js.map