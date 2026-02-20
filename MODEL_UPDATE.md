# Groq Model Update - Fix for Decommissioned Mixtral Model

## Issue
The Groq API deprecated the `mixtral-8x7b-32768` model, causing all API calls to fail with:
```
Groq API error: The model `mixtral-8x7b-32768` has been decommissioned and is no longer supported.
```

## Solution
Updated the application to use **Llama-3.3-70B-Versatile**, Groq's current recommended high-performance model.

## Files Modified

### 1. `/src/lib/groq.ts`
- Changed `MODEL` constant from `mixtral-8x7b-32768` to `llama-3.3-70b-versatile`

### 2. `/src/app/api/explain/route.ts`
- Changed `MODEL` constant from `mixtral-8x7b-32768` to `llama-3.3-70b-versatile`

### 3. `/README_NEW.md` (and others)
- Updated documentation to reflect the new model name

## Benefits of Llama-3.3-70B-Versatile

✅ **Higher Performance** - Better reasoning and comprehension
✅ **Active Support** - Groq's currently recommended model
✅ **Long Context** - Excellent for philosophical discussions
✅ **Versatile** - Handles both code and natural language well
✅ **Better Quality** - Improved output for Spinoza's complex concepts

## Testing

To verify the fix works:

1. Ensure `NEXT_PUBLIC_GROQ_API_KEY` is set in `.env.local`
2. Start the development server: `npm run dev`
3. Test the Geometric Advisor feature
4. Check that concept explanations load without errors

## Notes

- The API will automatically use the new model for all requests
- No breaking changes to the API contract
- All existing functionality remains unchanged
- Temperature and token limits remain optimized for philosophical content
