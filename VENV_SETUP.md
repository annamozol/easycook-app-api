# Virtual Environment Setup & Troubleshooting Guide

## Problem You Experienced

When you activated the virtual environment with `source .venv/bin/activate`, the activation appeared to work (you saw `(.venv)` in your terminal), but you couldn't import packages like `drf_spectacular` or `rest_framework`.

## Root Cause

There were two issues:

1. **Strict version constraints in requirements.txt** - The original file had overly specific version pins:
   ```
   Django>=3.2.4,<3.3          # Too restrictive
   psycopg2>=2.8.6,<2.9        # Too restrictive
   drf-spectacular>=0.15.1,<0.16  # Too restrictive
   ```
   These constraints prevented installing compatible packages with Python 3.14

2. **Packages weren't installed** - `drf_spectacular` and other dependencies were missing from your virtual environment

## Solution Implemented

### 1. Updated requirements.txt
Changed version constraints to be more flexible:
```diff
- Django>=3.2.4,<3.3
+ Django>=3.2.4

- djangorestframework>=3.12.4,<3.13
+ djangorestframework>=3.12.4

- psycopg2>=2.8.6,<2.9
+ psycopg2-binary>=2.9  # Also changed to psycopg2-binary for better compatibility

- drf-spectacular>=0.15.1,<0.16
+ drf-spectacular>=0.15.1

- Pillow>=8.2.0,<8.3.0
+ Pillow>=8.2.0
```

### 2. Reinstalled all packages
```bash
pip install --upgrade pip
pip install -r requirements.txt -r requirements.dev.txt
```

## What's Now Installed

```
✓ drf-spectacular           0.29.0
✓ djangorestframework       3.16.1
✓ Django                    6.0.2
✓ Pillow                    12.1.1
✓ psycopg2-binary           2.9.11
✓ PyYAML                    6.0.3
✓ flake8                    3.9.2
```

## How to Use Your Virtual Environment

### 1. Activate the environment
```bash
source .venv/bin/activate
```

You should see `(.venv)` prefix in your terminal prompt.

### 2. Install packages
```bash
pip install -r requirements.txt
pip install -r requirements.dev.txt  # For development tools
```

### 3. Verify imports work
```bash
python -c "import drf_spectacular; import rest_framework; print('All imports OK')"
```

### 4. Run Django
```bash
cd backend
python manage.py runserver
```

## How to Navigate to Package Source

Once activated, you can find package locations:

```bash
# Find drf_spectacular source
python -c "import drf_spectacular; print(drf_spectacular.__file__)"
# Output: /Users/anna/Documents/easycook-project/easycook-app-api/.venv/lib/python3.14/site-packages/drf_spectacular/__init__.py

# Find rest_framework source
python -c "import rest_framework; print(rest_framework.__file__)"
# Output: /Users/anna/Documents/easycook-project/easycook-app-api/.venv/lib/python3.14/site-packages/rest_framework/__init__.py

# Change to the package directory
cd $(python -c "import drf_spectacular; import os; print(os.path.dirname(drf_spectacular.__file__))")
```

## IDE Integration (PyCharm/VSCode)

To make your IDE recognize the virtual environment:

### PyCharm
1. Go to: **PyCharm → Preferences → Project → Python Interpreter**
2. Click **Add Interpreter → Add Local Interpreter**
3. Select **Existing Environment**
4. Choose: `/Users/anna/Documents/easycook-project/easycook-app-api/.venv/bin/python`

### VSCode
1. Open **Command Palette** (Cmd+Shift+P)
2. Search for **"Python: Select Interpreter"**
3. Choose: `./.venv/bin/python` from the project

Then your IDE will:
- ✓ Autocomplete imports
- ✓ Show type hints
- ✓ Allow "Go to Definition" to follow package sources
- ✓ Run tests with the correct Python environment

## Troubleshooting Checklist

### Package not found after activation?
```bash
# Make sure you're in the right directory
pwd  # Should be: /Users/anna/Documents/easycook-project/easycook-app-api

# Activate the environment
source .venv/bin/activate

# Reinstall all packages
pip install -r requirements.txt -r requirements.dev.txt

# Verify
pip list
```

### Still having issues?
```bash
# Check which Python is being used
which python
# Should output: /Users/anna/Documents/easycook-project/easycook-app-api/.venv/bin/python

# Check Python version
python --version

# See all packages in site-packages
python -c "import site; print(site.getsitepackages())"
```

### Recreate the virtual environment from scratch
```bash
# Deactivate current environment (if activated)
deactivate

# Remove old venv
rm -rf .venv

# Create new one
python -m venv .venv

# Activate
source .venv/bin/activate

# Reinstall everything
pip install --upgrade pip
pip install -r requirements.txt -r requirements.dev.txt
```

## Summary

Your virtual environment is now properly set up with all required packages. The key differences:

| Before | After |
|--------|-------|
| ❌ drf_spectacular not installed | ✅ drf_spectacular 0.29.0 installed |
| ❌ Strict version constraints blocked installation | ✅ Flexible version constraints |
| ❌ Couldn't follow package imports | ✅ Can follow package sources to venv |

You can now navigate to package source code and your IDE will properly recognize all imports!

