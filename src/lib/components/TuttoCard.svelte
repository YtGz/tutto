<script lang="ts">
    import { onMount } from 'svelte';
    import type { Card } from '../types';

    let deck: Card[] = [];
    let currentCard: Card | null = null;
    
    function createDeck(): Card[] {
        const cards: Card[] = [
            { type: 'Kleeblatt' },
            ...Array(5).fill({ type: 'Feuerwerk' }),
            ...Array(10).fill({ type: 'Stop' }),
            ...Array(5).fill({ type: 'Strasse' }),
            ...Array(5).fill({ type: 'PlusMinus' }),
            ...Array(5).fill({ type: 'X2' }),
            ...Array(5).fill({ type: 'Bonus', bonusPoints: 200 }),
            ...Array(5).fill({ type: 'Bonus', bonusPoints: 300 }),
            ...Array(5).fill({ type: 'Bonus', bonusPoints: 400 }),
            ...Array(5).fill({ type: 'Bonus', bonusPoints: 500 }),
            ...Array(5).fill({ type: 'Bonus', bonusPoints: 600 })
        ];
        return shuffleDeck([...cards]);
    }

    function shuffleDeck(cards: Card[]): Card[] {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }

    function drawCard() {
        if (deck.length === 0) {
            deck = createDeck();
        }
        currentCard = deck.pop() || null;
    }

    onMount(() => {
        deck = createDeck();
        drawCard();
    });
</script>

<div class="card-container">
    {#if currentCard}
        <div class="card {currentCard.type.toLowerCase()}">
            <div class="card-content">
                <h2>{currentCard.type}</h2>
                {#if currentCard.type === 'Bonus'}
                    <div class="bonus-points">{currentCard.bonusPoints}</div>
                {/if}
                <div class="card-icon">
                    {#if currentCard.type === 'Kleeblatt'}
                        🍀
                    {:else if currentCard.type === 'Feuerwerk'}
                        🎆
                    {:else if currentCard.type === 'Stop'}
                    <div class="stop-icon">🛑</div>
                    {:else if currentCard.type === 'Strasse'}
                        🎲
                    {:else if currentCard.type === 'PlusMinus'}
                    <div class="plusminus-container">
                        <div class="plusminus-symbol">±</div>
                        <div class="points">1000</div>
                    </div>
                    {:else if currentCard.type === 'X2'}
                        ×2
                    {:else if currentCard.type === 'Bonus'}
                        💎
                    {/if}
                </div>
            </div>
        </div>
    {/if}
    
    <button on:click={drawCard} class="draw-button">
        Draw Card
    </button>
</div>

<style>
    .card-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 2rem;
    }

    .card {
        width: 300px;
        height: 450px;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        transition: transform 0.3s ease;
        cursor: pointer;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    .card-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        text-align: center;
    }

    .card-icon {
        font-size: 5rem;
        margin: 2rem 0;
    }

    h2 {
        font-size: 2rem;
        margin: 0;
        color: white;
    }

    .bonus-points {
        font-size: 3rem;
        font-weight: bold;
        color: white;
    }

    .draw-button {
        padding: 1rem 2rem;
        font-size: 1.2rem;
        border: none;
        border-radius: 8px;
        background: #4CAF50;
        color: white;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .draw-button:hover {
        background: #45a049;
    }

    /* Card type specific styles */
    .kleeblatt {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
    }

    .feuerwerk {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
    }

    .stop {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
    }

    .stop-icon {
        background: white;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
    }
    
    .strasse {
        background: linear-gradient(135deg, #3498db, #2980b9);
    }

    .plusminus {
        background: linear-gradient(135deg, #9b59b6, #8e44ad);
    }

    .plusminus-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .plusminus-symbol {
        font-size: 5rem;
        font-weight: bold;
        color: white;
    }

    .points {
        font-size: 3rem;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .x2 {
        background: linear-gradient(135deg, #f1c40f, #f39c12);
    }

    .bonus {
        background: linear-gradient(135deg, #1abc9c, #16a085);
    }
</style>
