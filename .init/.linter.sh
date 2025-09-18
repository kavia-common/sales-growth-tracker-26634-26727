#!/bin/bash
cd /home/kavia/workspace/code-generation/sales-growth-tracker-26634-26727/crm_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

