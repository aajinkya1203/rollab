import React from 'react';
import './stacked.css';
import Test from '../../images/Stats/sunny.png'

const StackedCards = () => {
    return (
        <section className="cardy-listy">
            <article className="cardy">
                <header className="cardy-header">
                <p>Sep 11th 2020</p>
                <h2>Never forget</h2>
                </header>

                <div className="cardy-author">
                <a className="author-avatar" href="#">
                    <img src={Test} />
                </a>
                <svg className="half-circle" viewBox="0 0 106 57">
                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>

                <div className="author-name">
                    <div className="author-name-prefix">Author</div>
                    Jeff Delaney
                </div>
                </div>
                <div className="tagsy">
                <a href="#">html</a>
                <a href="#">css</a>
                <a href="#">web-dev</a>
                </div>
            </article>

            <article className="cardy">
                <header className="cardy-header">
                <p>Sep 11th 2020</p>
                <h2>cardy Tricks are fun!</h2>
                </header>

                <div className="cardy-author">
                <a className="author-avatar" href="#">
                    <img src={Test} />
                </a>
                <svg className="half-circle" viewBox="0 0 106 57">
                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>

                <div className="author-name">
                    <div className="author-name-prefix">Pirate</div>
                    Zheng Zhilong
                </div>
                </div>
                <div className="tagsy">
                <a href="#">html</a>
                <a href="#">css</a>
                </div>
            </article>

            <article className="cardy">
                <header className="cardy-header">
                <p>Sep 11th 2020</p>
                <h2>cardy Tricks are fun!</h2>
                </header>

                <div className="cardy-author">
                <a className="author-avatar" href="#">
                    <img src={Test} />
                </a>
                <svg className="half-circle" viewBox="0 0 106 57">
                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>

                <div className="author-name">
                    <div className="author-name-prefix">Pirate</div>
                    Francis Drake
                </div>
                </div>
                <div className="tagsy">
                <a href="#">html</a>
                <a href="#">css</a>
                </div>
            </article>

            <article className="cardy">
                <header className="cardy-header">
                <p>Sep 11th 2020</p>
                <h2>cardy Tricks are fun!</h2>
                </header>

                <div className="cardy-author">
                <a className="author-avatar" href="#">
                    <img src={Test} />
                </a>
                <svg className="half-circle" viewBox="0 0 106 57">
                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>

                <div className="author-name">
                    <div className="author-name-prefix">Pirate</div>
                    Edward Teach
                </div>
                </div>
                <div className="tagsy">
                <a href="#">html</a>
                <a href="#">css</a>
                </div>
            </article>

            <article className="cardy">
                <header className="cardy-header">
                <p>Sep 11th 2020</p>
                <h2>cardy Tricks are fun!</h2>
                </header>

                <div className="cardy-author">
                <a className="author-avatar" href="#">
                    <img src={Test} />
                </a>
                <svg className="half-circle" viewBox="0 0 106 57">
                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>

                <div className="author-name">
                    <div className="author-name-prefix">Pirate</div>
                    William Kidd
                </div>
                </div>
                <div className="tagsy">
                <a href="#">html</a>
                <a href="#">css</a>
                </div>
            </article>

            <article className="cardy">
                <header className="cardy-header">
                <p>Sep 11th 2020</p>
                <h2>cardy Tricks are fun!</h2>
                </header>

                <div className="cardy-author">
                <a className="author-avatar" href="#">
                    <img src="https://api.adorable.io/avatars/172/d.png" />
                </a>
                <svg className="half-circle" viewBox="0 0 106 57">
                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>

                <div className="author-name">
                    <div className="author-name-prefix">Pirate</div>
                    William Kidd
                </div>
                </div>
                <div className="tagsy">
                <a href="#">html</a>
                <a href="#">css</a>
                </div>
            </article>

            <article className="cardy">
                <header className="cardy-header">
                <p>Sep 11th 2020</p>
                <h2>cardy Tricks are fun!</h2>
                </header>

                <div className="cardy-author">
                <a className="author-avatar" href="#">
                    <img src="https://api.adorable.io/avatars/172/d.png" />
                </a>
                <svg className="half-circle" viewBox="0 0 106 57">
                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>

                <div className="author-name">
                    <div className="author-name-prefix">Pirate</div>
                    William Kidd
                </div>
                </div>
                <div className="tagsy">
                <a href="#">html</a>
                <a href="#">css</a>
                </div>
            </article>
        </section>
    )
}

export default StackedCards
