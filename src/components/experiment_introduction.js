import React from 'react'

function ExperimentIntroduction() {
    return (
        <div className={"ExperimentIntroduction"}
             style={{marginLeft: "100px", marginRight: "100px", fontSize: 'larger'}}>
            <h1>Experiment Introduction</h1>
            <p>
                Hello! Welcome to ANN LAB! I am Yifan Pei, the developer of this WEB application, which is also a part
                of my
                M.s.c Computer Science research. In this WEB application, I will choose 5000 IMDB data as the corpus to
                train four kinds of Artificial
                Neural Network (ANN) models: Multiple Layers Perceptron (MLP), Convolutional Neural Network (CNN),
                Recurrent Neural Network (RNN) and Long Short-Term Memory (LSTM) to solve NLP problem.
            </p>
            <p>
                The purpose of this application is to try to providing more straightforward knowledge and understanding
                of ANN by appealing the details of ANN models.
            </p>
        </div>
    )
}

export default ExperimentIntroduction;