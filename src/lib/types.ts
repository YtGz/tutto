export type CardType = 'Kleeblatt' | 'Feuerwerk' | 'Stop' | 'Strasse' | 'PlusMinus' | 'X2' | 'Bonus';

export interface Card {
    type: CardType;
    bonusPoints?: number;
}
