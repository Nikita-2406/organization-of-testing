import { Widget } from "../widget";

test("widget should render", () => {
  // document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const widget = new Widget(container);

  widget.bindToDom();

  expect(container.innerHTML).toEqual(Widget.markup);
});
