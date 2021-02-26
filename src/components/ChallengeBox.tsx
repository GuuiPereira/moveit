import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge, setIsAutoChallenge ,isAutoChallenge } = useContext(ChallengesContext);
    const {resetCountdown, startCountdown} = useContext(CountdownContext);

    function handleChallengeSuccessed(){

        completeChallenge();
        resetCountdown();

        if(isAutoChallenge) {

            startCountdown();
            
        }

    }

    function handleChallengeFailed(){

        resetCountdown();
        resetChallenge();
        
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (

                <div className={styles.challengeActive}>
                    <header>Ganhe { activeChallenge.amount } xp </header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}></img>
                        <strong> Novo Desafio </strong>
                        <p> { activeChallenge.description }</p>
                    </main>

                    <footer>
                        <div>
                            <button
                                type="button"
                                className={styles.challengeFailedButton}
                                onClick = {handleChallengeFailed}

                            >Falhei
                            </button>
                            <button
                                type="button"
                                className={styles.challengeSuccessedButton}
                                onClick = {handleChallengeSuccessed}
                                >
                                Completei
                            
                            </button>
                        </div>
                        
                        <div>
                            <input type="checkbox" id="autoChallengeFire" defaultChecked= {isAutoChallenge} onChange = {()=>{ setIsAutoChallenge(!isAutoChallenge)}}/>
                            <label htmlFor="autoChallengeFire">Inicie um novo ciclo automaticamente após completar o desafio</label>
                        </div>
                    </footer>

                </div>

            ) : (

                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up"></img>
                    Avance de level completando desafios.
                </p>
                    </div>

                )}

        </div>
    );
}