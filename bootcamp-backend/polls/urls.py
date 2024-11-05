from ninja import NinjaAPI, ModelSchema, Schema
from polls.models import Choice, Question
from django.utils import timezone

api = NinjaAPI()

class ChoiceSchema(ModelSchema):
    class Meta:
        model = Choice
        fields = [
            "id",
            "choice_text",
            "votes",
        ]

class QuestionSchema(ModelSchema):
    class Meta:
        model = Question
        fields = [
            "id",
            "question_text",
        ]
    choices: list[ChoiceSchema]

class AddQuestionSchema(Schema):
    question_text: str
    choices: list[str]

@api.post("/create_question", response=QuestionSchema)
def add(request, add_question: AddQuestionSchema):
    question = Question.objects.create(
        question_text=add_question.question_text, pub_date=timezone.now()
    )

    for choice in add_question.choices:
        Choice.objects.create(
            choice_text=choice,
            question=question
        )
    return question
    
@api.get("/question/{question_id}", response=QuestionSchema)
def get(request, question_id: int):
    return Question.objects.get(pk=question_id)