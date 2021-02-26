import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChallengesContext);

    const [actualMedal, setActualMedal] = useState('001-first-place.svg');

    const control = {
        1: true,
        5: false,
        10: false,
        15: false,
        20: false,
        30: false,
        40: false,
        50: false,
        60: false,
        70: false,
        80: false,
    }

    const [arraysMedal, setArraysMedal] = useState(control);

    const medals = {
        1: '001-first-place.svg',
        5: '012-second.svg',
        10: '023-third.svg',
        15: '009-winner.svg',
        20: '041-trophy-5.svg',
        30: '042-trophy-6.svg',
        40: '043-trophy-7.svg',
        50: '032-trophy-3.svg',
        60: '033-trophy-4.svg',
        70: '019-trophy.svg',
        80: '024-best.svg'

    }

    useEffect(() => {

        let find: boolean = false;

        Object.keys(medals).reverse().forEach((key) => {

            if (level >= +key && !find) {
                
                find = true;
                console.log(medals[key])
                setActualMedal(medals[key]);
            }

            if(find){
                control[key] = true;
            }
        });

        setArraysMedal(control);

    }, [level]);

    const clickOnImg = () => {

        const div = document.querySelector('#medals-div') as HTMLDivElement;
        if (!div.style.display || div.style.display === 'none') div.style.display = 'flex';
        else div.style.display = 'none';

    }

    return (
        <div className={styles.profileContainer}>
            <img src='https://github.com/GuuiPereira.png' alt='Guilherme Pereira'></img>
            <div>
                <strong> Guilherme Pereira</strong>
                <span>
                    <img src={`/medals/${actualMedal}`} onClick={clickOnImg} ></img>
                    <div id="medals-div" className={styles.profileMedalsContent}>
                        <div>
                            <img src="/medals/001-first-place.svg" title="Alcance o level 1" className = {arraysMedal[1] === true ? styles.visible : null} ></img>
                            <img src="/medals/012-second.svg" title="Alcance o level 5" className = {arraysMedal[5] === true ? styles.visible : null} ></img>
                            <img src="/medals/023-third.svg" title="Alcance o level 10" className = {arraysMedal[10] === true ? styles.visible : null}></img>
                        </div>
                        <div>
                            <img src="/medals/009-winner.svg" title="Alcance o level 15" className = {arraysMedal[15] === true ? styles.visible : null}></img>
                            <img src="/medals/041-trophy-5.svg" title="Alcance o level 20" className = {arraysMedal[20] === true ? styles.visible : null}></img>
                            <img src="/medals/042-trophy-6.svg" title="Alcance o level 30" className = {arraysMedal[30] === true ? styles.visible : null}></img>

                        </div>
                        <div>
                            <img src="/medals/043-trophy-7.svg" title="Alcance o level 40" className = {arraysMedal[40] === true ? styles.visible : null}></img>
                            <img src="/medals/032-trophy-3.svg" title="Alcance o level 50" className = {arraysMedal[50] === true ? styles.visible : null}></img>
                            <img src="/medals/033-trophy-4.svg" title="Alcance o level 60" className = {arraysMedal[60] === true ? styles.visible : null}></img>
                        </div>
                        <div>
                            <img src="/medals/019-trophy.svg" title="Alcance o level 70" className = {arraysMedal[70] === true ? styles.visible : null}></img>
                            <img src="/medals/024-best.svg" title="Alcance o level 80" className = {arraysMedal[80] === true ? styles.visible : null}></img>
                        </div>
                    </div>
                </span>
                <p>
                    <img src="icons/level.svg" alt="Level"></img>
                    Level {level}</p>
            </div>
        </div >
    );
}