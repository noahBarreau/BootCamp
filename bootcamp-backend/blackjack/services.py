import random

from blackjack.models import Game, Player
from django.core.exceptions import ObjectDoesNotExist
from types import SimpleNamespace

dataGlobal={}

def create_game(game_name: str, players: list[str]):
    global dataGlobal

    game = Game(name=game_name)
    game.save()

    dataGlobal = {
        "players": [],
        "playerThatPlay": players[0],
        "turn": 0,
        "score": 0
    }

    for name in players:
        player_obj = Player.objects.create(name=name, game=game)
        dataGlobal["players"].append({
            "id": player_obj.id,
            "name": player_obj.name,
            "score": 0,
            "game": player_obj.game.id
        })

    return game

def get_players(game_id):
    game = Game.objects.get(id=game_id)
    players = game.player.all()
    return players

def get_winners(game_id):
    pass

def modif_score(player_id, score):
    try:
        player = Player.objects.get(id=player_id)
        player.score = score
        player.save()
        return player
    except ObjectDoesNotExist:
        return None
    
def get_winners(game_id):
    game = Game.objects.get(id=game_id)
    under_21_players = game.players.filter(score__lte=21).order_by('-score')

    winners = []
    if under_21_players:
        best_score = under_21_players[0].score
        for player in under_21_players:
            if player.score == best_score:
                winners.append({
                    "player": player,
                    "rank": "1"
                })

    return winners

def end_turn():
    global dataGlobal

    try:
        turn = dataGlobal["turn"];
        current_player = dataGlobal["players"][turn];

        if dataGlobal["turn"]+1<len(dataGlobal["players"]):
            modif_score(current_player["id"], current_player["score"])
            dataGlobal["playerThatPlay"]=dataGlobal["players"][turn+1]["name"];
        
        else :
            pass
        
        dataGlobal["turn"]+=1;
        dataGlobal["score"]=0;
    except IndexError:
        pass
    
    return dataGlobal

def handle_dice_throw(diceAmount):
    global dataGlobal
    results = 0;
    turn = dataGlobal["turn"];
    
    for i in range(diceAmount.diceAmount):
        roll = random.randint(1, 6)
        results = results + roll;
    
    if dataGlobal["turn"]<len(dataGlobal["players"]):
        dataGlobal["players"][turn]["score"] += results
        dataGlobal["score"] += results
        if((dataGlobal["players"][turn]["score"])>21):
            end_turn();
    
    return dataGlobal

def announce_var(data):
    global dataGlobal

    data_dict = data.dict()
    for key, value in data_dict.items():
        dataGlobal[key] = value
    return dataGlobal