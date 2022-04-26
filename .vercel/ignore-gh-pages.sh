#!/bin/bash

# Don't try to build the gh-pages branch.

if [[ "$VERCEL_GIT_COMMIT_REF" != "gh-pages" ]] ; then
  # Proceed with the build.
  exit 1;
else
  # Don't build.
  exit 0;
fi
