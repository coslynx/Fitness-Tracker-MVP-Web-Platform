#!/bin/bash

set -euo pipefail

# Load environment variables
if [ -f .env ]; then
  source .env
fi

# Validate required environment variables
required_vars=(
  NEXT_PUBLIC_API_URL
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_KEY
  NEXT_PUBLIC_GOOGLE_CLIENT_ID
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  NEXT_PUBLIC_SENTRY_DSN
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Error: Missing environment variable: $var"
    exit 1
  fi
done

# Set default values for optional variables
# ...

# Project root directory
PROJECT_ROOT=$(pwd)

# Log file location
LOG_FILE="${PROJECT_ROOT}/logs/startup.log"

# PID file location
PID_FILE="${PROJECT_ROOT}/logs/fitness-tracker-mvp.pid"

# Service timeouts
SERVICE_TIMEOUT=30

# Health check intervals
HEALTH_CHECK_INTERVAL=2

# Utility functions
log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - INFO - $*" >> "${LOG_FILE}"
}

log_error() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - ERROR - $*" >&2
}

cleanup() {
  log_info "Cleaning up processes and files..."
  if [ -f "${PID_FILE}" ]; then
    kill -9 $(cat "${PID_FILE}") 2>/dev/null
  fi
  rm -f "${PID_FILE}" 2>/dev/null
  # Stop services (if applicable)
  # ...
}

check_dependencies() {
  log_info "Checking dependencies..."
  if ! command -v npm &> /dev/null; then
    log_error "Error: 'npm' not found. Please install Node.js."
    exit 1
  fi
  # Check for other dependencies (if required)
  # ...
}

# Health check functions
check_port() {
  local port="$1"
  if nc -z 127.0.0.1 "$port" &> /dev/null; then
    return 0
  else
    return 1
  fi
}

wait_for_service() {
  local port="$1"
  local timeout="$2"
  local retries=0
  until check_port "$port"; do
    if [ $retries -ge $timeout ]; then
      log_error "Error: Service on port $port not available after $timeout seconds."
      exit 1
    fi
    retries=$((retries + 1))
    sleep "${HEALTH_CHECK_INTERVAL}"
  done
}

verify_service() {
  local service="$1"
  # Check if the service is running and healthy
  # ...
  if [ $? -eq 0 ]; then
    log_info "Service '$service' is running and healthy."
  else
    log_error "Error: Service '$service' is not healthy."
    exit 1
  fi
}

# Service management functions
start_database() {
  log_info "Starting database service..."
  # Start PostgreSQL
  sudo pg_ctl start -D /var/lib/postgresql/data
  wait_for_service 5432 "${SERVICE_TIMEOUT}"
  verify_service "PostgreSQL"
}

start_backend() {
  log_info "Starting backend server..."
  cd "${PROJECT_ROOT}/backend"
  # Start Node.js server
  npm start
  wait_for_service 3000 "${SERVICE_TIMEOUT}"
  verify_service "Backend Server"
}

start_frontend() {
  log_info "Starting frontend service..."
  cd "${PROJECT_ROOT}/frontend"
  # Start Next.js dev server
  npm run dev
  wait_for_service 3001 "${SERVICE_TIMEOUT}"
  verify_service "Frontend Server"
}

store_pid() {
  local service="$1"
  local pid="$2"
  log_info "Storing PID for service '$service': $pid"
  echo "$pid" > "${PID_FILE}"
}

# Main execution flow
trap cleanup EXIT ERR
check_dependencies

# Start services in the correct order
start_database
start_backend
start_frontend

log_info "Startup script completed successfully."