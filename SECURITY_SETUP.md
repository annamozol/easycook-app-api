# Security Best Practices - Secret Key & Environment Variables

## What Was Done

Your Django application has been secured by moving the hardcoded `SECRET_KEY` to environment variables. This is a **Django security best practice**.

## Changes Made

### 1. **backend/app/settings.py**
- Changed hardcoded `SECRET_KEY` to read from environment variable
- Changed hardcoded `DEBUG` to read from environment variable
- Both have safe defaults for development

```python
SECRET_KEY = os.environ.get(
    'SECRET_KEY',
    'django-insecure-dev-only-change-in-production'
)
DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
```

### 2. **docker-compose.yml**
- Added `SECRET_KEY` environment variable for development
- Added `DEBUG` environment variable (set to `True` for dev)

### 3. **.env.example**
- Created template file showing required environment variables
- This helps team members know what secrets need to be set

### 4. **.gitignore**
- `.env` file is already ignored (won't be committed to git)

## How to Use

### Local Development

#### Option A: Using docker-compose (Recommended)
```bash
docker-compose up
```
The `docker-compose.yml` already has development values set.

#### Option B: Running locally
Create a `.env` file in the project root:
```
SECRET_KEY=django-insecure-dev-only-change-in-production
DEBUG=True
DB_HOST=localhost
DB_NAME=devdb
DB_USER=devuser
DB_PASS=changeme
```

Then run:
```bash
source .env
python backend/manage.py runserver
```

### Production Deployment

**IMPORTANT:** Generate a secure SECRET_KEY for production!

```bash
# Generate a strong secret key (run this in Python):
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

Then set these environment variables on your production server:
```bash
SECRET_KEY=<your-generated-secret-key>
DEBUG=False
DB_HOST=<production-db-host>
DB_NAME=<production-db-name>
DB_USER=<production-db-user>
DB_PASS=<production-db-password>
```

For platforms like Heroku, AWS, DigitalOcean, etc., use their environment variable/secrets manager.

## Security Checklist

- ✅ SECRET_KEY moved to environment variables
- ✅ DEBUG mode configurable via environment
- ✅ Database credentials use environment variables
- ✅ .env files not committed to git
- ✅ .env.example provided as template

## Best Practices Summary

1. **Never commit secrets to git** - Use `.env` files (add to `.gitignore`)
2. **Different secrets for each environment** - Dev, staging, and production should have different keys
3. **Use environment variables** - Industry standard for 12-factor apps
4. **Generate strong SECRET_KEY for production** - Not the development default
5. **Document required variables** - Use `.env.example` as documentation

## Next Steps

1. Remove the old SECRET_KEY from git history:
```bash
# First, amend the last commit if it was just committed
git log --oneline | head -5  # Check recent commits

# If the secret is in recent commits, consider rotating it in production
# as a precaution, even though it was dev-only
```

2. Create your `.env` file locally (never commit this!)
3. For production, use your deployment platform's secrets manager

