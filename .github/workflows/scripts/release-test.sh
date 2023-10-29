#!/usr/bin/env bash

# ... [The rest of your copyright header and comments] ...

# SCRIPT_LOCATION="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

# Retrieve GitHub Action Run Number from arguments
GITHUB_RUN_NUMBER=$1

# Create and checkout a new branch for the release
create_and_checkout_release_branch() {
    local releaseBranch="release-action-$GITHUB_RUN_NUMBER"

    git checkout -b "$releaseBranch" &&
    echo "Checked out to the release branch: $releaseBranch"
}

# Merge the release branch back to master
merge_to_master() {
    local releaseBranch="release-action-$GITHUB_RUN_NUMBER"

    git checkout master &&
    git merge --no-ff "$releaseBranch" -m "Merge release branch $releaseBranch" &&
    echo "Merged $releaseBranch into master"
}

dummy_long_running_process() {
    local releaseBranch="release-action-$GITHUB_RUN_NUMBER"
    local minutes=5

    for (( i=1; i<=$minutes; i++ ))
    do
        echo "Minute $i: Running dummy process..."
        sleep 60
    done

    # Committing a dummy file to the branch with action number appended to its name
    local dummyFileName="dummy_file_$GITHUB_RUN_NUMBER.txt"
    echo "This is a dummy file generated during the release process." > "$dummyFileName"
    git add "$dummyFileName"
    git commit -m "Add dummy file ($dummyFileName) during release process"
    echo "Committed $dummyFileName to the branch."
    git push --set-upstream origin fix-release-workflow
    echo "Pushed the changes to the remote branch."
}

if [ -z "$GITHUB_RUN_NUMBER" ]; then
    echo "GitHub Action number not provided. Exiting..." &&
    exit 1
fi

# Create and checkout the release branch
create_and_checkout_release_branch || exit 1

# Execute dummy long-running process
dummy_long_running_process || {
    echo "Error during the dummy process"
    exit 1
}

# Merge to master after successful release
#merge_to_master || exit 1
