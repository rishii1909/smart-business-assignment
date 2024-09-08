"use client";
import { Command } from "@/components/ui/command";
import {
  PokemonReference,
  useGetPokemonListQuery,
} from "@/lib/features/pokemon/pokemonAPISlice";
import { CommandInput } from "cmdk";
import React, { useEffect, useState } from "react";
import { PokeSelectorList } from "./PokeSelectorList";
import { Button } from "@/components/ui/button";
import { setPrimaryColor, themeSelector } from "@/lib/theme/themeSlice";
import { useSelector } from "react-redux";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { useAppDispatch } from "@/lib/hooks";
import { capitalize } from "lodash";
import { Badge } from "@/components/ui/badge";
import { Badge as BadgeIcon } from "lucide-react";

const DEFAULT_POKEMON_NAME = "pikachu-original-cap";

export const PokeSelector = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useSelector(themeSelector);

  const { data } = useGetPokemonListQuery(1400);

  const pokemonList =
    data?.results.map(
      (poke): PokemonReference => ({
        ...poke,
        name: poke.name.replaceAll("-", " "),
      })
    ) ?? [];

  useEffect(() => {
    dispatch(setPrimaryColor("0, 0%, 20%"));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value.toLowerCase();
    setSearchQuery(query);
  };
  const filteredPokemonList = pokemonList
    .filter((pokemon) => {
      return pokemon.name.includes(searchQuery);
    })
    .slice(0, 10);

  console.log(filteredPokemonList, theme);

  return (
    <div className="flex items-center flex-col mb-16">
      {theme.themePokemonName && theme.themePokemonGifURL && (
        <>
          <img
            src={theme.themePokemonGifURL}
            alt={theme.themePokemonName}
            className="h-20 transition-all group-hover:scale-125"
          />
          <Badge className="rounded-full shadow-lg">
            <BadgeIcon className="mr-2 fill-[--primary-300]" />
            {prettifyPokemonName(theme.themePokemonName)}
          </Badge>
        </>
      )}
      <div className="w-full">
        <div className="flex items-center py-4">
          <Command className="shadow-md md:min-w-[450px]">
            <CommandInput
              placeholder="Search for any pokemon to change theme! (Eg. Mew or Pikachu)"
              value={searchQuery}
              onInput={handleSearch}
              className="w-full p-2 border-primary-foreground rounded-md bg-[--primary-50]"
            />
            <PokeSelectorList pokemonList={filteredPokemonList} />
          </Command>
        </div>
      </div>
    </div>
  );
};

export const prettifyPokemonName = (name: string) =>
  name.split("-").map(capitalize).join(" ");
