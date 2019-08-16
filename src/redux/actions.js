export const types = {
  TOGGLE_MENU: "TOGGLE_MENU"
};

const toggleMenu = toggled => ({
  type: types.TOGGLE_MENU,
  payload: toggled
});

export default {
  toggleMenu
};
