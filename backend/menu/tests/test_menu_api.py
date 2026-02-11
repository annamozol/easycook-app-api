"""
Tests for menu APIs.
"""
from decimal import Decimal
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Menu, Recipe

from menu.serializers import (
    MenuSerializer,
    MenuDetailSerializer,
)


MENUS_URL = reverse('menu:menu-list')


def detail_url(menu_id):
    """Create and return a menu detail URL."""
    return reverse('menu:menu-detail', args=[menu_id])


def create_menu(user, **params):
    """Create and return a sample menu."""
    defaults = {
        'name': 'Sample Menu',
    }
    defaults.update(params)

    menu = Menu.objects.create(user=user, **defaults)
    return menu


def create_user(**params):
    """Create and return a new user."""
    return get_user_model().objects.create_user(**params)


class PublicMenuAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test auth is required to call API."""
        res = self.client.get(MENUS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateMenuAPITests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(email='user@example.com', password='test123')
        self.client.force_authenticate(self.user)

    def test_retrieve_menus(self):
        """Test retrieving a list of menus."""
        create_menu(user=self.user)
        create_menu(user=self.user)

        res = self.client.get(MENUS_URL)

        menus = Menu.objects.all().order_by('-id')
        serializer = MenuSerializer(menus, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_menu_list_limited_to_user(self):
        """Test list of menus is limited to authenticated user."""
        other_user = create_user(email='other@example.com', password='test123')
        create_menu(user=other_user)
        create_menu(user=self.user)

        res = self.client.get(MENUS_URL)

        menus = Menu.objects.filter(user=self.user)
        serializer = MenuSerializer(menus, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
        self.assertEqual(len(res.data), 1)

    def test_get_menu_detail(self):
        """Test get menu detail."""
        menu = create_menu(user=self.user)

        url = detail_url(menu.id)
        res = self.client.get(url)

        serializer = MenuDetailSerializer(menu)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_menu(self):
        """Test creating a menu."""
        payload = {'name': 'New Menu'}
        res = self.client.post(MENUS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        menu = Menu.objects.get(id=res.data['id'])
        self.assertEqual(menu.name, payload['name'])
        self.assertEqual(menu.user, self.user)

    def test_full_update_menu(self):
        """Test full update of a menu."""
        menu = create_menu(
            user=self.user,
            name='Usual Menu',
        )

        payload = {'name': 'Christmas Menu'}
        url = detail_url(menu.id)
        res = self.client.put(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        menu.refresh_from_db()
        self.assertEqual(menu.name, payload['name'])
        self.assertEqual(menu.user, self.user)

    def test_update_menu_user_returns_error(self):
        """Test changing the menu user results in an error."""
        new_user = create_user(email='user2@example.com', password='test123')
        menu = create_menu(user=self.user)

        payload = {'user': new_user.id}
        url = detail_url(menu.id)
        self.client.patch(url, payload)

        menu.refresh_from_db()
        self.assertEqual(menu.user, self.user)

    def test_delete_menu(self):
        """Test deleting a menu successful."""
        menu = create_menu(user=self.user)

        url = detail_url(menu.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Menu.objects.filter(id=menu.id).exists())

    def test_delete_other_user_menu_error(self):
        """Test trying to delete another user's menu gives an error."""
        new_user = create_user(email='user2@example.com', password='test123')
        menu = create_menu(user=new_user)

        url = detail_url(menu.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(Menu.objects.filter(id=menu.id).exists())

    def test_update_menu_with_existing_recipes(self):
        """Test updating a menu with existing recipes."""
        recipe = Recipe.objects.create(
            user=self.user,
            title='Sample recipe',
            time_minutes=30,
            price=Decimal('5.99'),
        )
        menu = create_menu(user=self.user)
        payload = {'recipe_ids': [recipe.id]}
        url = detail_url(menu.id)
        res = self.client.patch(url, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        menu.refresh_from_db()
        self.assertIn(recipe, menu.recipes.all())

    def test_clear_menu_recipes(self):
        """Test clearing a menu's recipes."""
        recipe = Recipe.objects.create(
            user=self.user,
            title='Sample recipe',
            time_minutes=30,
            price=Decimal('5.99'),
        )
        menu = create_menu(user=self.user)
        menu.recipes.add(recipe)

        payload = {'recipe_ids': []}
        url = detail_url(menu.id)
        res = self.client.patch(url, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        menu.refresh_from_db()
        self.assertEqual(menu.recipes.count(), 0)
