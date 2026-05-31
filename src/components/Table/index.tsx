import { useEffect, useState } from "react";
import { connectWebSocket } from "../../game/websocket"; // Ajuste o caminho se necessário
import { IBetDTO } from "../../models"; // Importando a tipagem que você enviou
import * as S from "./styles";

export function Table() {
  const [bets, setBets] = useState<IBetDTO[]>([]);

  useEffect(() => {
    connectWebSocket((message) => {

      if (message?.type === "sync" && message?.gameState?.bets) {
        setBets(message.gameState.bets);
      } 

      else if (message?.data?.bets) {
        setBets(message.data.bets);
      }
      
      if (message?.data?.phase === "betting" && (!message.data.bets || message.data.bets.length === 0)) {
        setBets([]);
      }
    });
  }, []);

  const formatMoney = (value: number) => `$${value.toFixed(2)}`;

  return (
    <S.TableContainer>
      <S.StyledTable>
        <S.TableHead>
          <S.TableRow>
            <S.TableHeaderCell>User</S.TableHeaderCell>
            <S.TableHeaderCell>Bet USD</S.TableHeaderCell>
            <S.TableHeaderCell>Multiplier</S.TableHeaderCell>
            <S.TableHeaderCell>Bet</S.TableHeaderCell>
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
              const hasCashedOut = bet.prize && bet.prize > 0;

              return (
                <S.TableRow key={bet.userId + index}>
                  <S.TableCell>{bet.userId}</S.TableCell>
                  
                  <S.TableCell>{formatMoney(bet.amount)}</S.TableCell>
                  
                  <S.TableCell>
                    {hasCashedOut ? `${(bet.prize / bet.amount).toFixed(2)}x` : "-"}
                  </S.TableCell>

                  <S.TableCell style={{ color: hasCashedOut ? "#10b981" : "#cac6d8", fontWeight: hasCashedOut ? 700 : 400 }}>
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