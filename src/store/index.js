import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from '#constants';

const useWindowStore = create(immer((set) => ({
  windows: WINDOW_CONFIG,
  nextXIndex: INITIAL_Z_INDEX,
  openWindow: (windowKey, data = null) => set((state) => {
    const win = state.windows[windowKey];
    if (win) {
      win.isOpen = true;
      win.zIndex = state.nextXIndex;
      win.data = data ?? win.data;
      state.nextXIndex++;
    }
  }),
  closeWindow: (windowKey) => set((state) => {
    const win = state.windows[windowKey];
    if (win) {
      win.isOpen = false;
      win.zIndex = INITIAL_Z_INDEX;
      win.data = null;
    }
  }),
  focusWindow: (windowKey) => set((state) => {
    const win = state.windows[windowKey];
    if (win) {
      win.zIndex = state.nextXIndex++;
    }
  })
})));

export default useWindowStore;
