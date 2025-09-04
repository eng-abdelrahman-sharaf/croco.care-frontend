import glob
import os
import re

# folder to search in
root = os.path.join("components","organ-groups" )

# find all .tsx files recursively
files = glob.glob(os.path.join(root, "**", "*.tsx"), recursive=True)

for filepath in files:
    filename = os.path.splitext(os.path.basename(filepath))[0]  # e.g. MyComponent
    print(f"Processing {filepath} (id={filename})")

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # replace <g> only if it doesn't already have an id
    new_content = re.sub(
        r"<g(?![^>]*className=)",  # match <g not already containing id=
        f'<g className={{cn(bodyPart === "{filename}" ? "opacity-100" : "opacity-30")}}',
        content
    )

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"✅ Updated: {filepath}")
    else:
        print(f"⚠️ Skipped (already had a className): {filepath}")
