import pytest

from social_core import PostStore


def test_posts_are_owner_scoped_and_searchable():
    store = PostStore()
    post = store.create("alice", "Privacy matters")
    store.create("alice", "A different note")
    assert store.feed("alice", "privacy")[0].id == post.id
    with pytest.raises(KeyError):
        store.get("bob", post.id)
    with pytest.raises(KeyError):
        store.delete("bob", post.id)


def test_empty_posts_are_rejected():
    with pytest.raises(ValueError):
        PostStore().create("alice", " ")
