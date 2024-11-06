from ninja import NinjaAPI, ModelSchema, Schema
from blackjack.models import Game, Player
from blackjack.services import create_game
from blackjack.services import get_players
from blackjack.services import modif_score
from blackjack.services import get_winners
from typing import List

api = NinjaAPI()

class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = [
            "id",
            "name",
            "score",
            "game",
        ]
        
class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "turn",
            "ended",
        ]
    players: List[PlayerSchema]

class AddGameSchema(Schema):
    game_name: str
    players : list[str]

class GetPlayersSchema(Schema):
    id: int

class ScoreUpdateSchema(Schema):
    score: int

class WinnerSchema(Schema):
    player: PlayerSchema
    rank: int

@api.post("/create_game", response=GameSchema)
def add(request, add_game: AddGameSchema):
    return create_game(add_game.game_name, add_game.players)

@api.get("/get_players", response=List[PlayerSchema])
def get(request, id: int = None):
    return get_players(id)

@api.get("/get_winners", response=List[WinnerSchema])
def winners(request, game_id: int):
    return get_winners(game_id)

@api.put("/modif_score", response=PlayerSchema)
def put(request, data: ScoreUpdateSchema, player_id: int = None):
    return modif_score(player_id, data.score)