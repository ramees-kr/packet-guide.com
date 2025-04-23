#!/bin/bash

# Output file
output_file="all_projects_readme2.txt"

# Clear the output file if it exists
> "$output_file"

# Find all README.md files and process them
find ./projects -iname "README.md" | while read -r file; do
  echo "### $(basename "$(dirname "$file")")" >> "$output_file"  # Add the directory name as a header
  echo >> "$output_file"                                        # Add a blank line
  cat "$file" >> "$output_file"                                 # Append the file content
  echo >> "$output_file"                                        # Add a blank line between files
done

echo "All README.md files have been combined into $output_file."