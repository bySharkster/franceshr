#!/bin/bash

# Test the auto-close-orders Edge Function
# Make sure to set your environment variables first

echo "🧪 Testing Auto-Close Orders Edge Function"
echo "==========================================="
echo ""

# Get the project URL and service role key from .env or config
if [ -f .env ]; then
    source .env
fi

# Check if variables are set
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set"
    echo ""
    echo "Please set them in your .env file or export them:"
    echo "  export SUPABASE_URL='https://your-project.supabase.co'"
    echo "  export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'"
    exit 1
fi

# Extract project ref from URL
PROJECT_REF=$(echo $SUPABASE_URL | sed 's/https:\/\/\(.*\)\.supabase\.co/\1/')

echo "📡 Calling Edge Function..."
echo "Project: $PROJECT_REF"
echo ""

# Call the function
RESPONSE=$(curl -s -X POST \
  "${SUPABASE_URL}/functions/v1/auto-close-orders" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json")

# Check if response is valid JSON
if echo "$RESPONSE" | jq empty 2>/dev/null; then
    echo "✅ Response received:"
    echo "$RESPONSE" | jq '.'
    
    # Extract key info
    SUCCESS=$(echo "$RESPONSE" | jq -r '.success')
    CLOSED_COUNT=$(echo "$RESPONSE" | jq -r '.closedCount')
    MESSAGE=$(echo "$RESPONSE" | jq -r '.message')
    
    echo ""
    echo "📊 Summary:"
    echo "  Success: $SUCCESS"
    echo "  Message: $MESSAGE"
    echo "  Orders Closed: $CLOSED_COUNT"
    
    if [ "$CLOSED_COUNT" != "null" ] && [ "$CLOSED_COUNT" -gt 0 ]; then
        echo ""
        echo "📝 Closed Orders:"
        echo "$RESPONSE" | jq -r '.closedOrders[]? | "  • \(.serviceType) (ID: \(.id))"'
    fi
else
    echo "❌ Error: Invalid response"
    echo "$RESPONSE"
    exit 1
fi

echo ""
echo "🎉 Test complete!"
