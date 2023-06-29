#!/bin/bash

# Check if the script is being run as the user "ohri"
# if [ "$(whoami)" != "ohri" ]; then
#     echo "Script must be run as user: ohri"
#     exit 255
# fi
# Set the path to Tomcat home directory
TOMCAT_HOME=/opt/tomcat/tomcat7
# Set the Tomcat user and group
TOMCAT_USER=tomcat7
TOMCAT_GROUP=tomcat7

# Print a starting message
echo "Starting OHRI 3.x Build and Assemble ..."
CWD=$(pwd)

# TMPDIR=./temp/dir

echo "STEP1: Building OHRI 3.x ..."
npx --legacy-peer-deps openmrs@4.5.0 build \
  --build-config importmap_namibia.json \
  --target ./frontend_legacy \
  --page-title "Namibia Dev" \
  --support-offline false

echo "STEP2: Assembling OHRI 3.x ..."
npx --legacy-peer-deps openmrs@4.5.0 assemble \
  --manifest \
  --mode config \
  --config importmap_namibia.json \
  --target ./frontend_legacy

# Function to update microfrontends
update_microfrontends () {
    # Print a message indicating the removal of frontends
    echo "Removing frontends..."
    # Remove the existing frontends directory
    rm -rf /opt/tomcat/tomcat7/.OpenMRS/frontend/

            # Check if the frontends directory was successfully removed
        if [ $? -eq 0 ]; then
            # Print a success message with the exit code
            echo "SUCCESS: Frontends removed. Exit code - $?"
        else
            # Print a failure message with the exit code and exit the script with code 1
            echo "ERROR: Frontends not removed. Exit code - $?" >&2
            exit 1
        fi
        # Create the frontend directory if it doesn't exist
        mkdir -p "${TOMCAT_HOME}/.OpenMRS/frontend"

        # Check if the directory was successfully created or already exists
        if [ $? -eq 0 ]; then
            # Print a success message with the exit code
            echo "SUCCESS: Frontend directory created. Exit code - $?"
        else
            # Print a failure message with the exit code and exit the script with code 1
            echo "ERROR: Frontend directory creation failed. Exit code - $?" >&2
            exit 1
        fi
        # Copy the new microfrontends to the Tomcat frontend directory
        cp -R dist/* "${TOMCAT_HOME}/.OpenMRS/frontend/"

        # Check if the copy was successful
        if [ $? -eq 0 ]; then
            # Print a success message with the exit code
            echo "SUCCESS: Microfrontends updated. Exit code - $?"
        else
            # Print a failure message with the exit code and exit the script with code 1
            echo "ERROR: Microfrontends update failed. Exit code - $?" >&2
            exit 1
        fi
        # Change ownership of the frontend directory to the Tomcat user and group
        chown -R "${TOMCAT_USER}:${TOMCAT_GROUP}" "${TOMCAT_HOME}/.OpenMRS/frontend"

        # Check if the ownership change was successful
        if [ $? -eq 0 ]; then
            # Print a success message with the exit code
            echo "SUCCESS: Frontend directory ownership changed. Exit code - $?"
        else
            # Print a failure message with the exit code and exit the script with code 1
            echo "ERROR: Frontend directory ownership change failed. Exit code - $?" >&2
            exit 1
        fi
    # Copy the new microfrontends to the Tomcat frontend directory
    cp -R dist/*  tomcat/tomcat7/.OpenMRS/frontend
}

# Call the update_microfrontends function with the provided parameters
update_microfrontends ${TOMCAT_HOME} ${TOMCAT_USER} ${TOMCAT_GROUP}
