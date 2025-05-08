(function waitForSelectBox() {
    if (typeof window.SelectBox === "undefined") {
        setTimeout(waitForSelectBox, 50); // essaie à nouveau dans 50ms
        return;
    }

    const originalSelectBox = window.SelectBox;
    if (!originalSelectBox.cache) {
        originalSelectBox.cache = {};
    }

    const originalAddToCache = originalSelectBox.add_to_cache;
    originalSelectBox.add_to_cache = function (id, options) {
        if (!originalSelectBox.cache[id]) {
            originalSelectBox.cache[id] = [];
        }
        return originalAddToCache.call(this, id, options);
    };
})();