"""
Serializers for menu APIs.
"""
from rest_framework import serializers

from core.models import Menu, Recipe
from recipe.serializers import RecipeSerializer


class MenuSerializer(serializers.ModelSerializer):
    """Serializer for menus."""
    recipe_ids = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(),
        write_only=True,
        many=True,
        required=False,
    )

    class Meta:
        model = Menu
        fields = ['id', 'name', 'recipe_ids']
        read_only_fields = ['id']

    def create(self, validated_data):
        """Create a menu."""
        recipes = validated_data.pop('recipe_ids', [])
        menu = Menu.objects.create(**validated_data)
        if recipes:
            menu.recipes.set(recipes)
        return menu



class MenuDetailSerializer(MenuSerializer):
    """Serializer for menu detail view."""
    recipes = RecipeSerializer(many=True, read_only=True)

    class Meta(MenuSerializer.Meta):
        fields = MenuSerializer.Meta.fields + ['recipes']

    def update(self, instance, validated_data):
        """Update a menu."""
        recipes = validated_data.pop('recipe_ids', None)
        if recipes is not None:
            instance.recipes.set(recipes)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
