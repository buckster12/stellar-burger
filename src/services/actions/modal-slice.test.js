import modalReducer, {hideModal, showModal} from "./modal-slice";

describe("modalSlice", () => {
    it("should have initial state", () => {
        expect(modalReducer(undefined, {})).toEqual({
            isModalOpen: false,
            modalContent: null,
        });
    });

    // showModal
    it("should handle showModal", () => {
        // test ReactNode
        const modalContent = <div>Modal Content</div>;
        expect(modalReducer({}, showModal(modalContent))).toEqual({
            isModalOpen: true,
            modalContent: modalContent,
        });
    });

    // hideModal
    it("should handle hideModal", () => {
        expect(modalReducer({}, hideModal)).toEqual({
            isModalOpen: false,
            modalContent: null,
        });
    });
});