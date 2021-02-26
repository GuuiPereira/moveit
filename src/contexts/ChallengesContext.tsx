import { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../../challenges.json';

interface ChallengesProviderProps {
    children: ReactNode
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {

    level: number,
    currentExperience: number,
    experienceToNextLevel: number,
    challengesCompleted: number,
    isAutoChallenge: boolean,
    activeChallenge: Challenge,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    setIsAutoChallenge
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {

    const [level, setLevel] = useState(15);
    const [currentExperience, setCurrentExperience] = useState(350);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isAutoChallenge, setIsAutoChallenge] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {

        Notification.requestPermission();

    }, []);

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {

        const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randonChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            const notification = new Notification('Novo Desafio', {
                // icon: 'http://fc06.deviantart.net/fs70/f/2012/099/d/f/stackoverflow_16x16_icon_by_muntoo_stock-d4vl2v4.png',
                body: `Valendo ${challenge.amount}xp!`
            });

            notification.onclick = () => {

                window.focus();

            }
        }
    }

    function resetChallenge() {

        setActiveChallenge(null);

    }

    function completeChallenge() {

        if (!activeChallenge) return;

        const challengeExp = activeChallenge.amount;
        let totalExp = currentExperience + challengeExp;
        if (totalExp >= experienceToNextLevel) {

            totalExp = totalExp - experienceToNextLevel
            levelUp();
        }

        setCurrentExperience(totalExp);
        setChallengesCompleted(challengesCompleted + 1);
        resetChallenge();

    }


    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            activeChallenge,
            isAutoChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            setIsAutoChallenge

        }}
        >
            {children}
        </ChallengesContext.Provider>
    )

}