# Generated by Django 5.1.2 on 2024-11-06 09:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blackjack', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='game',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='players', to='blackjack.game'),
        ),
    ]
