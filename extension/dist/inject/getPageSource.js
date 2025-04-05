var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Utility functions
const isRestrictedUrl = (url) => {
    const restrictedProtocols = ['chrome://', 'edge://', 'about:', 'data:'];
    return restrictedProtocols.some(protocol => url.startsWith(protocol));
};
const getPageSource = () => __awaiter(void 0, void 0, void 0, function* () {
    return document.documentElement.outerHTML;
});
const getCurrentTab = () => __awaiter(void 0, void 0, void 0, function* () {
    const [tab] = yield chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
});
// Main function
function getTabSource() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentTab = yield getCurrentTab();
            if (!(currentTab === null || currentTab === void 0 ? void 0 : currentTab.url) || !currentTab.id) {
                return { sourceCode: undefined, error: 'No active tab found' };
            }
            if (isRestrictedUrl(currentTab.url)) {
                return { sourceCode: undefined, error: 'Cannot access restricted URLs' };
            }
            const [injectionResult] = yield chrome.scripting.executeScript({
                target: { tabId: currentTab.id },
                func: getPageSource
            });
            return { sourceCode: injectionResult.result };
        }
        catch (error) {
            return {
                sourceCode: undefined,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    });
}
// Event handler wrapper
export const handleClick = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield getTabSource();
    if (result.error) {
        console.error('Error:', result.error);
        return;
    }
    if (result.sourceCode) {
        console.log('Page Source:', result.sourceCode);
        // Process source code here
    }
});
//   // DOM setup
//   document.addEventListener('DOMContentLoaded', () => {
//     const actionBtn = document.getElementById('actionBtn');
//     if (actionBtn) {
//       actionBtn.addEventListener('click', handleClick);
//     }
//   });
//# sourceMappingURL=getPageSource.js.map