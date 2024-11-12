import random

from blackjack.models import Game, Player
from django.core.exceptions import ObjectDoesNotExist
from types import SimpleNamespace
from django.forms.models import model_to_dict

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

def modif_score(player_id, score):
    try:
        player = Player.objects.get(id=player_id)
        player.score = score
        player.save()
        return player
    except ObjectDoesNotExist:
        return None
    
def get_winners():
    under_21_players = list(filter(lambda player: player["score"] <= 21, dataGlobal["players"]))

    sorted_players = sorted(under_21_players, key=lambda player: player["score"], reverse=True)

    winners = []
    if sorted_players:
        best_score = sorted_players[0]["score"]
        for player in sorted_players:
            if player["score"] == best_score:
                winners.append({
                    "player": model_to_dict(Player.objects.get(id=player["id"])),
                    "rank": "1"
                })

    return winners

def end_turn():
    global dataGlobal

    try:
        turn = dataGlobal["turn"];
        current_player = dataGlobal["players"][turn];

        if dataGlobal["turn"]<len(dataGlobal["players"]):
            modif_score(current_player["id"], current_player["score"])

        if dataGlobal["turn"]+1<len(dataGlobal["players"]):
            modif_score(current_player["id"], current_player["score"])
            dataGlobal["playerThatPlay"]=dataGlobal["players"][turn+1]["name"];
        
        else :
            winners = get_winners()
            dataGlobal["winners"] = winners
            
        
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
            data = end_turn();
        else:
            data = {}
    
    if 'data' in locals() and "winners" in data:
        if data["winners"]:
            dataGlobal["winners"] = data["winners"]

    return dataGlobal

def announce_var(data):
    global dataGlobal

    data_dict = data.dict()
    for key, value in data_dict.items():
        dataGlobal[key] = value
    return dataGlobal