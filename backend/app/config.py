"""Application configuration.

Settings are loaded from environment variables (and an optional `.env` file
in the `backend/` directory) via `pydantic-settings`. Copy `.env.example` to
`.env` and fill in real values for local development.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


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
    database_url: str = (
        "postgresql+psycopg2://user:password@localhost:5432/app_db"
    )

    # --- JWT ---------------------------------------------------------------
    jwt_secret_key: str = "change-me-to-a-random-secret"
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
    """Return a cached `Settings` instance."""
    return Settings()
