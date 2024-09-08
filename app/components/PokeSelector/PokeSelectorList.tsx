import { CommandList } from "@/components/ui/command";
import { PokemonReference } from "@/lib/features/pokemon/pokemonAPISlice";
import { PokeSelectorListItem } from "./PokeSelectorListItem";

export interface PokeSelectorListProps {
  pokemonList: PokemonReference[];
}
export const PokeSelectorList = ({ pokemonList }: PokeSelectorListProps) => {
  console.log({ pokemonList });
  return (
    <CommandList className="rounded-sm bg-slate-200">
      {pokemonList.map((pokemon) => (
        <PokeSelectorListItem pokemon={pokemon} />
      ))}
    </CommandList>
  );
};
