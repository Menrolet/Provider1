import SideBarView from "./sidebarView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import NewEmployeeButton from "../newEmployeeButton/newEmployeeButton.js";
import NewRequestButton from "../newRequestButton/newRequestButton.js";
import { Subscription } from "../../common/types.js";
import { Events } from "../../modules/events.js";
import { Queries } from "../../modules/queries.js";
type Children = {
    newEmploeeButton?: NewEmployeeButton;
    newRequestButton?: NewRequestButton;
}
/**
 * ViewModel-компонент соответсвующего View
 * @class Sidebar
 */
export default class Sidebar extends BasicComponent {
    view: SideBarView;
    children: Children = {};

    constructor() {
        super();
        this.view = new SideBarView();
    }

    render(): HTMLElement {
        this.root = this.view.render();

        const newEmployeeButton = new NewEmployeeButton();
        this.root.appendChild(newEmployeeButton.render());
        this.children.newEmploeeButton = newEmployeeButton;
        
        const newRequestButton = new NewRequestButton();
        this.root.appendChild(newRequestButton.render());
        this.children.newRequestButton = newRequestButton;
        
        return this.root;
    }

    async subscribe(): Promise<void> {
        let subscription: Subscription;
        
        this.children.newEmploeeButton?.subscribe(() => {
            Events.makeEmploeeCardOverlay({});
        });

        const emploees = await Queries.getEmploeeList();
        const reqTypes = await Queries.getReqTypesList()
        this.children.newRequestButton?.subscribe(() => {
            Events.makeRequestCardOverlay({
                emploees: emploees,
                types: reqTypes,
            });
        });
    }
};
