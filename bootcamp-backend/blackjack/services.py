from blackjack.models import Game, Player
from django.core.exceptions import ObjectDoesNotExist

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