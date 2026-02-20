/**
 * Groq API Integration
 * Handles all communication with the Groq API for AI-powered explanations
 */

const NEXT_PUBLIC_GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile"; // High-performance model, supports reasoning and code

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqRequestBody {
  model: string;
  messages: GroqMessage[];
  temperature: number;
  max_tokens: number;
  top_p: number;
  stream: boolean;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Call Groq API with proper error handling
 * @param userPrompt - The user's question or request
 * @param systemPrompt - The system prompt that defines the AI's behavior
 * @returns The AI's response text
 */
export async function callGroqAI(
  userPrompt: string,
  systemPrompt: string = "You are a helpful assistant."
): Promise<string> {
  if (!NEXT_PUBLIC_GROQ_API_KEY) {
    console.error("NEXT_PUBLIC_GROQ_API_KEY is not configured");
    throw new Error(
      "API key not configured. Please set NEXT_PUBLIC_GROQ_API_KEY in your environment variables."
    );
  }

  if (!userPrompt || userPrompt.trim().length === 0) {
    throw new Error("User prompt cannot be empty");
  }

  const messages: GroqMessage[] = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: userPrompt,
    },
  ];

  const requestBody: GroqRequestBody = {
    model: MODEL,
    messages,
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
  };

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error?.message || `HTTP ${response.status}`;

      if (response.status === 401) {
        throw new Error("Invalid Groq API key. Please check your credentials.");
      } else if (response.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again."
        );
      } else if (response.status === 500) {
        throw new Error("Groq API server error. Please try again later.");
      }

      throw new Error(`Groq API error: ${errorMessage}`);
    }

    const data: GroqResponse = await response.json();

    if (
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      throw new Error("Invalid response format from Groq API");
    }

    return data.choices[0].message.content;
  } catch (error) {
    // Re-throw with helpful context
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      `Unexpected error calling Groq API: ${String(error)}`
    );
  }
}

/**
 * Validate that the API key is properly configured
 * @returns true if API key is set, false otherwise
 */
export function isGroqConfigured(): boolean {
  return !!NEXT_PUBLIC_GROQ_API_KEY && NEXT_PUBLIC_GROQ_API_KEY.trim().length > 0;
}
