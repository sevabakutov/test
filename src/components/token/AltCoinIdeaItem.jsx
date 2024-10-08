import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './tokenGLobal.scss'

const AltCoinIdeaItem = (idea) => {
    return (
        <div className="alt-coin-idea-item">
            <img src={idea.image} className="idea-logo" />
            <div className="alt-coin-idea-info">
                <div className="alt-coin-idea-header">
                    <h3 className="alt-coin-idea-active">
                        {idea.active}
                    </h3>
                        <div className="idea-rating">
                            <CircularProgressbar
                            value={token.rating}
                            maxValue={100}
                            text={`${idea.rating}`}
                            styles={buildStyles({
                                pathTransitionDuration: 0.5,
                                textSize: '32px',
                                pathColor: `#5eff5a`,
                                textColor: '#5eff5a',
                                trailColor: '#1c1c1c',
                            })}
                        />
                    </div>
                </div>

                <div className="alt-coin-idea-meta">
                    <span>MC {idea.marketCap}</span>
                    <span>{idea.age}</span>
                    <span>{idea.comments} comments</span>
                </div>

                <p className="alt-coin-description">{idea.description}</p>

                <div className="token-creator">
                    <span>Created by</span>
                    <span>{idea.creator}</span>
                </div>
            </div>
        </div>
    );
};

export default AltCoinIdeaItem;
