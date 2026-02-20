/**
 * API Route: Groq AI Explanations
 * Handles requests for AI-powered explanations about Spinoza's Ethics
 */

import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile"; // High-performance model

interface RequestBody {
  userPrompt: string;
  systemPrompt?: string;
}

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * POST /api/explain
 * Process AI explanation request
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Only allow POST requests
  if (request.method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    // Check API key configuration
    if (!NEXT_PUBLIC_GROQ_API_KEY) {
      console.error("NEXT_PUBLIC_GROQ_API_KEY is not configured");
      return NextResponse.json(
        {
          error: "Server configuration error",
          details:
            "Groq API key not configured. Please set NEXT_PUBLIC_GROQ_API_KEY.",
        },
        { status: 500 }
      );
    }

    // Parse request body
    const body: RequestBody = await request.json();
    const { userPrompt, systemPrompt } = body;

    // Validate inputs
    if (!userPrompt || typeof userPrompt !== "string") {
      return NextResponse.json(
        { error: "Invalid input: userPrompt is required and must be a string" },
        { status: 400 }
      );
    }

    if (userPrompt.trim().length === 0) {
      return NextResponse.json(
        { error: "User prompt cannot be empty" },
        { status: 400 }
      );
    }

    // Rate limiting (basic check)
    if (userPrompt.length > 5000) {
      return NextResponse.json(
        { error: "Prompt too long. Maximum 5000 characters." },
        { status: 400 }
      );
    }

    // Prepare messages
    const messages: GroqMessage[] = [
      {
        role: "system",
        content:
          systemPrompt ||
          "You are a helpful assistant knowledgeable about Spinoza's philosophy.",
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    // Call Groq API
    const groqResponse = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      }),
    });

    // Handle Groq API errors
    if (!groqResponse.ok) {
      const errorData = await groqResponse.json().catch(() => ({}));

      if (groqResponse.status === 401) {
        return NextResponse.json(
          { error: "Authentication failed. Invalid API key." },
          { status: 401 }
        );
      } else if (groqResponse.status === 429) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            message: "Please wait a moment and try again.",
          },
          { status: 429 }
        );
      } else if (groqResponse.status >= 500) {
        return NextResponse.json(
          {
            error: "Groq service error",
            message: "The AI service is temporarily unavailable.",
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          error: "Groq API error",
          details: errorData.error?.message || "Unknown error",
        },
        { status: groqResponse.status }
      );
    }

    // Parse successful response
    const data = await groqResponse.json();

    if (
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      return NextResponse.json(
        { error: "Invalid response format from Groq API" },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        text: data.choices[0].message.content,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/explain:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
