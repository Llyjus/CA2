from flask import Flask, render_template, session
from database import get_db, close_db
from flask_session import Session

app = Flask(__name__)
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
app.teardown_appcontext(close_db)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/introduction')
def instruction():
    return render_template('instruction.html')

@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')

@app.route('/choose_character')
def choose():
    return render_template('choose.html')

@app.route('/game')
def game():
    return render_template('game.html')