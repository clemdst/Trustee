import { getSourceCode } from './helpers/getPageSource.js';
// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    const actionBtn = document.getElementById('actionBtn');
    if (actionBtn) {
        actionBtn.addEventListener('click', getSourceCode);
    }
    else {
        console.error('Action button not found in the DOM');
    }
});
const startElementInspector = () => {
    let highlight = {
        element: null,
        originalOutline: ''
    };
    const handleMouseOver = (e) => {
        // Reset previous element
        if (highlight.element) {
            highlight.element.style.outline = highlight.originalOutline;
        }
        const target = e.target;
        highlight.element = target;
        highlight.originalOutline = target.style.outline;
        // Highlight current element
        target.style.outline = '2px solid #f00';
        target.style.cursor = 'pointer';
    };
    const handleClick = (e) => {
        e.preventDefault();
        const target = e.target;
        console.log({
            element: target,
            tagName: target.tagName,
            classList: Array.from(target.classList),
            id: target.id,
            attributes: Array.from(target.attributes)
        });
        // Clean up
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('click', handleClick);
        target.style.outline = highlight.originalOutline;
    };
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);
};
// Add to your existing code:
// if (actionBtn) {
//   actionBtn.addEventListener('click', async () => {
//     const currentTab = await getCurrentTab();
//     if (currentTab?.id) {
//       chrome.scripting.executeScript({
//         target: { tabId: currentTab.id },
//         func: startElementInspector
//       });
//     }
//   });
// }
//# sourceMappingURL=popup.js.map