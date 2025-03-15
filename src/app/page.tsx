'use client'

import styles from "./page.module.css";
import classNames from "classnames";
// @ts-ignore
import heroAnimation from "/public/assets/homePage/heroAnimation.json";
import Lottie from "lottie-react";

export default function Home() {


  return (
    <div className={classNames(styles.page, 'py-96')}>
        <div className={styles.hero}>
            <div className='main-container'>
                <div className={styles.heroContainer}>
                    <div className={styles.heroInfo}>
                        <h1 className={styles.title}><span>CheckFin</span> - Ваш помошник учета личных финансов</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque commodi consectetur
                            culpa excepturi explicabo iste mollitia nesciunt, nostrum numquam quas quod ratione
                            sapiente! Ducimus eveniet maiores natus quae sequi.</p>
                    </div>
                    <Lottie
                        animationData={heroAnimation}
                        loop={true}
                        className={styles.animation}
                        height={450}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
