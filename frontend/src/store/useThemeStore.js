import {create} from 'zustand'

export const useThemeStore = create((set)=>({
  theme: localStorage.getItem("chatBridge-theme") || "coffee",
  setTheme: (theme)=>{
    localStorage.setItem("chatBridge-theme",theme);
    set({theme});
  },
}))