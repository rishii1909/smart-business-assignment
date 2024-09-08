import { CommandItem } from "@/components/ui/command";
import {
  PokemonReference,
  useGetPokemonDataQuery,
} from "@/lib/features/pokemon/pokemonAPISlice";
import { MouseEventHandler, useRef, useState } from "react";
import { capitalize } from "lodash";
import { extractColors } from "extract-colors";
import { useExtractColor } from "react-extract-colors";
import { useAppDispatch } from "@/lib/hooks";
import { setPrimaryColor, setTheme } from "@/lib/theme/themeSlice";
import clsx from "clsx";
import { prettifyPokemonName } from "./PokeSelector";

const MASTER_BALL_PLACEHOLDER_ENDPOINT =
  "https://pokeapi.co/api/v2/item-fling-effect/7/";

interface PokeSelectorListItemProps {
  pokemon: PokemonReference;
}
export const PokeSelectorListItem = ({
  pokemon,
}: PokeSelectorListItemProps) => {
  const dispatch = useAppDispatch();

  const { data, error } = useGetPokemonDataQuery(pokemon.url);

  error && console.error(error);

  const pokemonGifURL = data?.sprites.other.showdown.front_default;

  const pokemonImageURL = pokemonGifURL ?? MASTER_BALL_PLACEHOLDER_ENDPOINT;

  const { dominantColor, loading } = useExtractColor(pokemonImageURL);
  const dominantColorExtracted = !loading && !error && dominantColor;

  const dominantHslColor = rgbToHsl(dominantColor);

  const updateTheme: ((value: string) => void) | undefined = () => {
    console.log("updateTheme");
    dominantColorExtracted &&
      dispatch(
        setTheme({
          primary: dominantHslColor,
          themePokemonGifURL: pokemonImageURL,
          themePokemonName: pokemon.name,
        })
      );
  };

  return (
    <CommandItem
      className="flex group flex-row space-x-2 cursor-pointer justify-between text-md py-3 rounded-none hover:py-6 transition-all"
      style={
        dominantColorExtracted
          ? {
              background: `hsla(${dominantHslColor}, 40%)`,
            }
          : {}
      }
      onSelect={updateTheme}
    >
      <div className="text-[--primary-700]">
        {prettifyPokemonName(pokemon.name)}
      </div>
      <div className="w-20 flex justify-center">
        <img
          src={pokemonImageURL}
          alt={pokemon.name}
          className="h-12 transition-all group-hover:scale-125"
        />
      </div>
    </CommandItem>
  );
};

const rgbToHsl = (rgbString: string) => {
  if (!rgbString) return "hsla(0, 0%, 0%, 0)";

  const rgb = rgbString.match(/\d+/g)?.map(Number)!;

  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0,
    s = 0,
    l = 0;
  l = (max + min) / 2;

  if (delta === 0) {
    h = s = 0; // achromatic
  } else {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h}, ${s}%, ${l}%`;
};
