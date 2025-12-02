import { useParams } from "react-router-dom";
import type { ReactNode } from "react";

interface GameRouterProps {
  jogos: Record<number, ReactNode>;
}

export default function GameRouter({ jogos }: GameRouterProps) {
  const { id } = useParams<{ id: string }>();

  const gameId = Number(id);
  const jogo = jogos[gameId];

  if (!jogo) {
    return (
      <h1 style={{ textAlign: "center", marginTop: 50 }}>
        Jogo não encontrado
      </h1>
    );
  }

  return <>{jogo}</>;
}
