from blackjack.models import Game, Player

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

def modif_score(player_id, game_id):
    player = Player.objects.get(pk=player_id)
    player.score = modif_score
    player.save()