from ninja import NinjaAPI, ModelSchema, Schema
from blackjack.models import Game, Player
from blackjack.services import create_game
from blackjack.services import get_players

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

class GetPlayersSchema(Schema):
    id: int

@api.post("/create_game", response=GameSchema)
def add(request, add_game: AddGameSchema):
    return create_game(add_game.game_name, add_game.players)

@api.post("/get_players", response=GameSchema)
def get(request, get_players: GetPlayersSchema):
    return get_players(get_players.id)