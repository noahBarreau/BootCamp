from blackjack.models import Game, Player
from django.core.exceptions import ObjectDoesNotExist

dataGlobal={}

def create_game(game_name: str, players: list[str]):
    game = Game(name=game_name)
    game.save()

    for name in players:
        Player.objects.create(name=name, game=game)
    
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

def end_turn(self, results):
    return self.score;


def announce_var(data):
    global dataGlobal
    data_dict = data.dict()
    for key, value in data_dict.items():
        dataGlobal[key] = value

    return dataGlobal