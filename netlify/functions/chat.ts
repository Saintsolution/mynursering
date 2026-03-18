import type { Handler } from "@netlify/functions";
import OpenAI from "openai";

type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  userMessage?: string;
  history?: ChatHistoryItem[];
  systemInstruction?: string;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply: "Método não permitido." }),
    };
  }

  try {
    console.log("TEM OPENAI_API_KEY?", !!process.env.OPENAI_API_KEY);

    const body: ChatRequestBody = JSON.parse(event.body || "{}");
    const { userMessage, history = [], systemInstruction = "" } = body;

    console.log("BODY RECEBIDO:", {
      userMessage,
      historyLength: history.length,
      hasSystemInstruction: !!systemInstruction,
    });

    if (!userMessage) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply: "Mensagem não enviada." }),
      };
    }

    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reply: "A Dra. Maria Yvone teve um pequeno contratempo.",
          error: "OPENAI_API_KEY não encontrada no ambiente.",
        }),
      };
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: "system" as const,
        content: systemInstruction || "Você é a Professora Doutora Enfermeira Maria Yvone Chaves Mauro.",
      },
      ...history.map((item) => ({
        role: item.role,
        content: item.content,
      })),
      {
        role: "user" as const,
        content: userMessage,
      },
    ];

    console.log("ENVIANDO PARA OPENAI:", {
      model: "gpt-4o-mini",
      messagesCount: messages.length,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    console.log("RESPOSTA OPENAI OK");

    const reply = response.choices?.[0]?.message?.content || "Sem resposta.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply }),
    };
  } catch (error: unknown) {
    console.error("Erro OpenAI na function:", error);

    if (error instanceof Error) {
      console.error("Mensagem do erro:", error.message);
      console.error("Stack:", error.stack);
    }

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reply: "A Dra. Maria Yvone teve um pequeno contratempo.",
        error: error instanceof Error ? error.message : "Erro interno desconhecido.",
      }),
    };
  }
};