import { useEffect, useState } from "react";
import { connectWebSocket } from "../../game/websocket"; // Ajuste o caminho se necessário
import { IBetDTO } from "../../models"; // Importando a tipagem que você enviou
import * as S from "./styles";

export function Table() {
  const [bets, setBets] = useState<IBetDTO[]>([]);

  useEffect(() => {
    // Conecta ao WebSocket para receber a lista de apostas em tempo real
    connectWebSocket((message) => {
      // 1. Quando o usuário entra, o servidor envia um evento do tipo 'sync'
      if (message?.type === "sync" && message?.gameState?.bets) {
        setBets(message.gameState.bets);
      } 
      // 2. Durante o jogo, o servidor envia o estado atualizado com as apostas em data.bets
      else if (message?.data?.bets) {
        setBets(message.data.bets);
      }
      
      // 3. Se o jogo resetar na fase de betting, o servidor limpa as apostas lá no backend, 
      // mas garantimos que a tabela limpe aqui no front também se necessário
      if (message?.data?.phase === "betting" && (!message.data.bets || message.data.bets.length === 0)) {
        setBets([]);
      }
    });
  }, []);

  // Função auxiliar para formatar dinheiro
  const formatMoney = (value: number) => `$${value.toFixed(2)}`;

  return (
    <S.TableContainer>
      <S.StyledTable>
        <S.TableHead>
          <S.TableRow>
            <S.TableHeaderCell>User</S.TableHeaderCell>
            <S.TableHeaderCell>Bet USD</S.TableHeaderCell>
            <S.TableHeaderCell>Multiplier</S.TableHeaderCell>
            <S.TableHeaderCell>Payout / Profit</S.TableHeaderCell>
          </S.TableRow>
        </S.TableHead>

        <tbody>
          {bets.length === 0 ? (
            <S.TableRow>
              <S.TableCell colSpan={4} style={{ textAlign: "center", color: "#64748b" }}>
                Aguardando apostas...
              </S.TableCell>
            </S.TableRow>
          ) : (
            bets.map((bet, index) => {
              // Se o player já fez cashout, ele terá um 'prize' (prêmio) calculado pelo servidor
              const hasCashedOut = bet.prize && bet.prize > 0;

              return (
                <S.TableRow key={bet.userId + index}>
                  {/* Nome do usuário */}
                  <S.TableCell>{bet.userId}</S.TableCell>
                  
                  {/* Valor que ele apostou */}
                  <S.TableCell>{formatMoney(bet.amount)}</S.TableCell>
                  
                  {/* Multiplicador do Cashout (se ele saiu do jogo) ou '-' se ainda está correndo */}
                  <S.TableCell>
                    {hasCashedOut ? `${(bet.prize / bet.amount).toFixed(2)}x` : "-"}
                  </S.TableCell>
                  
                  {/* Quanto ele ganhou, mudando de cor se ganhou */}
                  <S.TableCell style={{ color: hasCashedOut ? "#10b981" : "#2b2150", fontWeight: hasCashedOut ? 700 : 400 }}>
                    {hasCashedOut ? formatMoney(bet.prize) : "Jogando..."}
                  </S.TableCell>
                </S.TableRow>
              );
            })
          )}
        </tbody>
      </S.StyledTable>
    </S.TableContainer>
  );
}