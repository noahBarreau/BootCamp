from ninja import NinjaAPI, ModelSchema, Schema
from blackjack.models import Game, Player

api = NinjaAPI()

class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "turn",
            "ended",
        ]

class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = [
            "id",
            "name",
            "score",
            "game",
        ]

class AddGameSchema(Schema):
    game_name: str
    players : list[str]

@api.post("/create_game", response=GameSchema)
def add(request, add_game: AddGameSchema):
    game = Game.objects.create(
        name=add_game.game_name
    )

    for player in add_game.players:
        print("test")
        print(player)
        Player.objects.create(
            name=player,
            game=game,
        )
    return game