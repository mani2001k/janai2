"""Application configuration.

Settings are loaded from environment variables (and an optional `.env` file
in the `backend/` directory) via `pydantic-settings`. Copy `.env.example` to
`.env` and fill in real values for local development.

If `JWT_SECRET_KEY` is not provided via the environment/`.env`, a secure
random secret is generated automatically for development so the app can
still start and issue/validate tokens. That generated secret only lives for
the current process — set `JWT_SECRET_KEY` explicitly (e.g. via Replit
Secrets) for anything that needs tokens to remain valid across restarts,
such as production.
"""

import logging
import secrets
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict

logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- App -----------------------------------------------------------
    app_name: str = "Backend API"
    environment: str = "development"
    debug: bool = True

    # --- Database --------------------------------------------------------
    # Populated from the DATABASE_URL environment variable (Replit-managed
    # Neon PostgreSQL). The placeholder below is only used if that variable
    # is somehow absent.
    database_url: str = (
        "postgresql+psycopg2://user:password@localhost:5432/app_db"
    )

    # --- JWT ---------------------------------------------------------------
    # Optional on input: if unset, `get_settings()` fills in a generated
    # secret below rather than shipping an insecure hardcoded default.
    jwt_secret_key: str | None = None
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_minutes: int = 10080

    # --- CORS ------------------------------------------------------------
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Return a cached `Settings` instance.

    If no `JWT_SECRET_KEY` was supplied via the environment or `.env`, a
    random secret is generated once per process and used for the lifetime
    of this run (cached via `lru_cache`), so tokens issued and verified
    within the same run stay consistent.
    """
    settings = Settings()
    if not settings.jwt_secret_key:
        settings.jwt_secret_key = secrets.token_hex(32)
        logger.warning(
            "JWT_SECRET_KEY is not set; generated a temporary secret for this "
            "process. Set JWT_SECRET_KEY as an environment variable/secret "
            "for tokens to remain valid across restarts."
        )
    return settings
