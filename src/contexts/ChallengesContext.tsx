import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
interface ChallengesProviderProps {

    level: number
    currentExperience: number,
    challengesCompleted: number
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
    closeLevelUpModal: () => void,
    setIsAutoChallenge
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [isAutoChallenge, setIsAutoChallenge] = useState(false);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {

        Notification.requestPermission();

    }, []);

    useEffect(() => {

        Cookies.set('level', level.toString());
        Cookies.set('currentExperience', currentExperience.toString());
        Cookies.set('challengesCompleted', challengesCompleted.toString());

    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        
        setIsLevelUpModalOpen(false);
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
            closeLevelUpModal,
            setIsAutoChallenge

        }}
        >
            {children}
            { isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )

}