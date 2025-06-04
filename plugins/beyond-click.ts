type BeyondClickHTMLElement = HTMLElement & {
    __beyondClickHandler__?: (event: MouseEvent) => void;
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('beyond-click', {
        mounted(el: BeyondClickHTMLElement, bindings) {
            el.__beyondClickHandler__ = (event: MouseEvent) => {
                if (!el.contains(event.target as Node)) {
                    if (typeof bindings.value === 'function') {
                        bindings.value(event);
                    }
                }
            };
            document.addEventListener('click', el.__beyondClickHandler__);
        },
        unmounted(el: BeyondClickHTMLElement) {
            if (el.__beyondClickHandler__) {
                document.removeEventListener('click', el.__beyondClickHandler__);
                delete el.__beyondClickHandler__;
            }
        }
    })
})