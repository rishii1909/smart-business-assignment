import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getPalette from "tailwindcss-palette-generator";
import tinycolor from "tinycolor2";
import { RootState } from "../store";

interface ThemeState {
  primary: string;
  themePokemonName: string;
  themePokemonGifURL: string;
}

const initialState: ThemeState = {
  primary: "#3498db", // Default primary color
  themePokemonName: "",
  themePokemonGifURL: "",
};

type SetThemeProps = ThemeState;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setPrimaryColor(state, action: PayloadAction<string>) {
      const primaryColor = action.payload;

      state.primary = primaryColor;
      setPrimaryColorTheme(primaryColor);
    },
    setTheme(state, action: PayloadAction<SetThemeProps>) {
      console.log("set theme");
      const { primary, themePokemonName, themePokemonGifURL } = action.payload;

      state.primary = primary;
      state.themePokemonName = themePokemonName;
      state.themePokemonGifURL = themePokemonGifURL;

      console.log(state);

      setPrimaryColorTheme(primary);
    },
  },
});

const tailwindShades = {
  50: 95,
  100: 86,
  200: 76,
  300: 66,
  400: 56,
  500: 46,
  600: 36,
  700: 26,
  800: 16,
  900: 6,
  950: 3,
};

const setPrimaryColorTheme = (primaryColor: string) => {
  const palette = getPalette({
    color: `hsl(${primaryColor})`,
    name: "primary",
    shade: getTailwindShadeByLightness(`hsl(${primaryColor})`),
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  });

  for (const key in palette.primary) {
    document.documentElement.style.setProperty(
      `--primary-${key}`,
      palette.primary[key]
    );
  }
  document.documentElement.style.setProperty(
    "--primary",
    palette.primary.DEFAULT
  );
};

// Function to get the Tailwind shade based on lightness
function getTailwindShadeByLightness(color: string) {
  const hsl = tinycolor(color).toHsl();
  const lightness = hsl.l * 100;

  let closestShade = 0;
  let minDiff = Infinity;

  for (const [shade, threshold] of Object.entries(tailwindShades)) {
    const diff = Math.abs(lightness - threshold);
    if (diff < minDiff) {
      minDiff = diff;
      closestShade = Number(shade);
    }
  }

  return closestShade;
}

export const { setPrimaryColor, setTheme } = themeSlice.actions;

export const themeSelector = (state: RootState) => state.theme;

export default themeSlice;
