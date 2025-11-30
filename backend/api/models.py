from django.db import models

from django.db import models

class Question(models.Model):
    pergunta = models.CharField(max_length=255)
    opcoes = models.JSONField()
    respostaCorreta = models.IntegerField()

