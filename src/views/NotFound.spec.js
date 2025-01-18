import { render } from "@testing-library/vue";
import NotFound from "@/views/NotFound.vue";

describe("NotFound.vue", () => {
    it("debe renderizar correctamente el título 404", () => {
        const { getByText } = render(NotFound);
        expect(getByText("404 - Página no encontrada")).toBeTruthy();
    });
});