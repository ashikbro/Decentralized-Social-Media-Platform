"""A small owner-scoped post store suitable for local-first experimentation."""

from dataclasses import dataclass
from datetime import datetime, timezone
import sqlite3


@dataclass(frozen=True)
class Post:
    id: int
    owner_id: str
    body: str
    created_at: str


class PostStore:
    def __init__(self, database: str = ":memory:"):
        self.connection = sqlite3.connect(database)
        self.connection.row_factory = sqlite3.Row
        self.connection.execute(
            "CREATE TABLE IF NOT EXISTS posts "
            "(id INTEGER PRIMARY KEY, owner_id TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL)"
        )
        self.connection.commit()

    def create(self, owner_id: str, body: str) -> Post:
        if not owner_id.strip():
            raise ValueError("owner_id cannot be empty")
        if not body.strip():
            raise ValueError("body cannot be empty")
        now = datetime.now(timezone.utc).isoformat()
        cursor = self.connection.execute(
            "INSERT INTO posts(owner_id, body, created_at) VALUES (?, ?, ?)",
            (owner_id, body.strip(), now),
        )
        self.connection.commit()
        return self.get(owner_id, cursor.lastrowid)

    def get(self, owner_id: str, post_id: int) -> Post:
        row = self.connection.execute(
            "SELECT * FROM posts WHERE owner_id = ? AND id = ?", (owner_id, post_id)
        ).fetchone()
        if row is None:
            raise KeyError("post not found")
        return Post(row["id"], row["owner_id"], row["body"], row["created_at"])

    def feed(self, owner_id: str, query: str = "") -> list[Post]:
        rows = self.connection.execute(
            "SELECT * FROM posts WHERE owner_id = ? ORDER BY created_at DESC", (owner_id,)
        ).fetchall()
        needle = query.strip().casefold()
        return [
            Post(row["id"], row["owner_id"], row["body"], row["created_at"])
            for row in rows
            if not needle or needle in row["body"].casefold()
        ]

    def delete(self, owner_id: str, post_id: int) -> None:
        self.get(owner_id, post_id)
        self.connection.execute("DELETE FROM posts WHERE owner_id = ? AND id = ?", (owner_id, post_id))
        self.connection.commit()
