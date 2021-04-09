# ai

Trains a decision-tree based AI for motor credit decisioning.

Input data given in `data.tsv`. Feature cells are on a monthly basis, in pounds. Class cells classify interest rate that can be given (0 = low, 1 = medium, 2 = high, 3 = vhigh).

Outputs a PDF and JavaScript function that represent the classifier.

## Setup

Install [pipenv](https://pypi.org/project/pipenv/)

Run

```
pipenv install
pipenv shell
```

## Running

```
python ai.py
```
