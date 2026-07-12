---
name: passlib + bcrypt incompatibility
description: passlib's bcrypt backend detection breaks with modern bcrypt releases; use the bcrypt library directly for password hashing in Python backends.
---

`passlib.context.CryptContext(schemes=["bcrypt"])` fails at hash/verify time
against `bcrypt>=4.1` with `AttributeError: module 'bcrypt' has no attribute
'__about__'` (passlib probes an attribute that newer bcrypt versions removed),
surfacing as `ValueError: password cannot be longer than 72 bytes` deep in
passlib's internals — a misleading error that hides the real cause.

**Why:** passlib (last released 1.7.4) predates bcrypt's 4.x/5.x API changes
and its backend-detection code never got updated to match.

**How to apply:** Skip passlib for bcrypt hashing. Call the `bcrypt` package
directly instead: `bcrypt.hashpw(password.encode()[:72], bcrypt.gensalt())`
and `bcrypt.checkpw(...)`. Manually truncate to 72 bytes first since bcrypt
itself raises on longer inputs. No passlib dependency needed at all.
