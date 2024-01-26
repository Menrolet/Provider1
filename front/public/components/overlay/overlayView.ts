import BasicComponentView from "../_basicComponent/basicComponentView.js";

/**
 * @class OverlayView
 */
export default class OverlayView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.id = 'overlay';

        overlay.appendChild(document.createElement('div'));

        const centerDiv = document.createElement('div');
        centerDiv.classList.add('overlay__center');
        centerDiv.id = 'overlay__center';
        overlay.appendChild(centerDiv);

        overlay.appendChild(document.createElement('div'));

        return overlay;
    }
}
